"use client";
import React from "react";
import { UserAuth } from "@/context/AuthContext";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckOutPage from "@/components/CheckOutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_KEY is undefined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const Page = () => {
  const { user } = UserAuth();

  const Plus = 49.99;

  const Pro = 159.99;

  return (
    <>
      {user ? (
        <div>
          <div className="max-w-6xl mx-auto p-10   text-center border m-10 rounded-md">
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold mb-2">Plus</h1>
              <h2 className="text-2xl">
                has requested<span className="font-bold">${Plus}</span>
              </h2>
            </div>
            <div>
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: Math.round(Plus * 100),
                  currency: "usd",
                }}
              >
                <CheckOutPage
                  amount={Plus}
                  subscriptionType={"plus"}
                  email={user.email}
                />
              </Elements>
            </div>
          </div>
          <div className="max-w-6xl mx-auto p-10   text-center border m-10 rounded-md">
            <div className="mb-10">
              <h1 className="text-4xl font-extrabold mb-2">Pro</h1>
              <h2 className="text-2xl">
                has requested<span className="font-bold">${Pro}</span>
              </h2>
            </div>
            <div>
              <Elements
                stripe={stripePromise}
                options={{
                  mode: "payment",
                  amount: Math.round(Pro * 100),
                  currency: "usd",
                }}
              >
                <CheckOutPage
                  amount={Pro}
                  subscriptionType={"pro"}
                  email={user.email}
                />
              </Elements>
            </div>
          </div>
        </div>
      ) : (
        <div>login to view this page</div>
      )}
    </>
  );
};

export default Page;
