import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import admin from "firebase-admin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "my-next-app",
    }),
  });
}

const db = admin.firestore();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const signature = headers().get("stripe-signature");

  let data;
  let eventType;
  let event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }

  data = event.data;
  eventType = event.type;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        let user;
        const session = await stripe.checkout.sessions.retrieve(
          data.object.id,
          {
            expand: ["line_items"],
          },
        );
        const customerId = session?.customer;
        const customer = await stripe.customers.retrieve(customerId);
        const priceId = session?.line_items?.data[0]?.price.id;

        if (customer.email) {
          const userRef = db.collection("users").doc(customer.email);
          const userSnapshot = await userRef.get();

          if (!userSnapshot.exists) {
            user = {
              email: customer.email,
              name: customer.name,
              customerId,
              priceId,
              hasAccess: true,
            };
            await userRef.set(user);
          } else {
            user = userSnapshot.data();
            user.priceId = priceId;
            user.hasAccess = true;
            await userRef.update(user);
          }
        } else {
          console.error("No user found");
          throw new Error("No user found");
        }

        break;
      }

      case "customer.subscription.deleted": {
        const subscription = await stripe.subscriptions.retrieve(
          data.object.id,
        );
        const userRef = db.collection("users").doc(subscription.customer);
        const userSnapshot = await userRef.get();

        if (userSnapshot.exists) {
          const user = userSnapshot.data();
          user.hasAccess = false;
          await userRef.update(user);
        }

        break;
      }
      ////////////////////////add case to get automatically money from user after month/year

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }
  } catch (e) {
    console.error("stripe error: " + e.message + " | EVENT TYPE: " + eventType);
  }

  return NextResponse.json({});
}
