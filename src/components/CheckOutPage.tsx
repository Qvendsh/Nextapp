"use client";
import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { getAuth } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const CheckOutPage = ({
  amount,
  subscriptionType,
  email,
}: {
  amount: number;
  subscriptionType: string;
  email: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: Math.round(amount * 100) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  if (!clientSecret) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}&subscriptionType=${subscriptionType}`,
      },
    });

    if (error) {
      setErrorMessage(error.message);
    } else {
      const user = getAuth().currentUser;
      if (user) {
        const userRef = doc(db, "users", user.email!);

        await setDoc(
          userRef,
          {
            email: user.email,
            subscriptionType,
            updatedAt: new Date(),
          },
          { merge: true },
        );

        console.log("Subscription updated successfully");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="bg-white p-2  rounded-md">
        {clientSecret && <PaymentElement />}

        <button className="w-full text-white bg-black p-5 mt-2 rounded-md font-bold">
          {!loading ? `Confirm ${amount}` : "Processing..."}
        </button>
      </form>
    </>
  );
};

export default CheckOutPage;
