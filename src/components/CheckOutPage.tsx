import React, { useEffect, useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { convertToSubcurrency } from "@/app/pages/api/create-payment-intent/route";

const CheckOutPage = ({ amount }: { amount: number }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetch("/pages/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    // if (!stripe || !elements) {
    //   return;
    // }

    // const { error: submitError } = await elements.submit();

    // if (submitError) {
    //   setErrorMessage(submitError.message);
    //   setLoading(false);
    //   return;
    // }

    // const { error } = await stripe.confirmPayment({
    //   elements,
    //   clientSecret,
    //   confirmParams: {
    //     return_url: `http://localhost:3000/payment-success?amount=${amount}`,
    //   },
    // });

    // if (error) {
    //   setErrorMessage(error.message);
    // } else {
    //   console.log(errorMessage);
    // }

    setLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="bg-white p-2  rounded-md">
        {clientSecret && <PaymentElement />}

        <button className="w-full text-white bg-black p-5 mt-2 rounded-md font-bold">
          {!loading ? `Confirm ${amount}` : "Processing..."}
        </button>
      </form>
    </div>
  );
};

export default CheckOutPage;
