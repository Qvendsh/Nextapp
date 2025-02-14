import { NextResponse } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import admin from "firebase-admin";
import { User, StripeInvoice } from "./interfaces";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "my-next-app",
    }),
  });
}

const db = admin.firestore();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET as string;

export async function POST(req: Request): Promise<NextResponse> {
  const body = await req.text();
  const headersObj = await headers();
  const signature = headersObj.get("stripe-signature") as string;

  let data: any;
  let eventType: string | undefined;
  let event: Stripe.Event | null = null;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

    eventType = event.type;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(`Webhook signature verification failed. ${error.message}`);
    } else {
      console.error(
        "An unknown error occurred during webhook event verification.",
      );
    }
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 },
    );
  }

  if (event === null || eventType === undefined) {
    console.error("Failed to construct event or event type is undefined.");
  }

  data = event.data;

  try {
    switch (eventType) {
      case "checkout.session.completed": {
        let user: User;
        const session = await stripe.checkout.sessions.retrieve(
          data.object.id,
          {
            expand: ["line_items"],
          },
        );
        const customerId = session?.customer as string;
        const customer: any = await stripe.customers.retrieve(customerId);
        const priceId: any = session?.line_items?.data[0]?.price?.id;

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
            user = userSnapshot.data() as User;
            user.priceId = priceId!;
            user.hasAccess = true;
            await userRef.update({
              email: user.email,
              name: user.name,
              customerId: user.customerId,
              priceId: user.priceId,
              hasAccess: user.hasAccess,
              nextBillingDate: user.nextBillingDate,
            });
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
        const userRef = db
          .collection("users")
          .doc(subscription.customer as string);
        const userSnapshot = await userRef.get();

        if (userSnapshot.exists) {
          const user: any = userSnapshot.data() as User;
          user.hasAccess = false;
          await userRef.update({
            email: user.email,
            name: user.name,
            customerId: user.customerId,
            priceId: user.priceId,
            hasAccess: user.hasAccess,
            nextBillingDate: user.nextBillingDate,
          });
        }

        break;
      }

      case "invoice.payment_succeeded": {
        const invoice = data.object as StripeInvoice;
        const subscriptionId = invoice.subscription;
        const customerId = invoice.customer;

        const subscription =
          await stripe.subscriptions.retrieve(subscriptionId);

        const userRef = db.collection("users").doc(customerId as string);
        const userSnapshot = await userRef.get();

        if (userSnapshot.exists) {
          const user = userSnapshot.data() as User;

          if (invoice.payment_intent.status === "succeeded") {
            console.log(`Payment succeeded for user ${user.email}`);

            user.hasAccess = true;
            await userRef.update({
              email: user.email,
              name: user.name,
              customerId: user.customerId,
              priceId: user.priceId,
              hasAccess: user.hasAccess,
              nextBillingDate: user.nextBillingDate,
            });

            const nextBillingDate = subscription.current_period_end;
            await userRef.update({ nextBillingDate });
          } else {
            console.error("Payment failed for user", user.email);
            user.hasAccess = false;
            await userRef.update({
              email: user.email,
              name: user.name,
              customerId: user.customerId,
              priceId: user.priceId,
              hasAccess: user.hasAccess,
              nextBillingDate: user.nextBillingDate,
            });
          }
        }

        break;
      }

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }
  } catch (e) {
    console.error("Error processing the event: ", e);
  }

  return NextResponse.json({});
}
