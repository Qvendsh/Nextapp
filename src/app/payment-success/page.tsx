"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import SubscriptionMessage from "@/components/SubscriptionMessage";
import { UserAuth } from "@/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebaseConfig";

const Page = () => {
  const { user } = UserAuth();
  const searchParams = useSearchParams();
  const [amount, setAmount] = useState<number | null>(null);
  const [subType, setSubType] = useState<string | null>(null);

  useEffect(() => {
    const fetchAmount = async () => {
      const amountParam = searchParams.get("amount");
      if (amountParam) {
        setAmount(Number(amountParam));
      }
    };
    fetchAmount();

    const fetchSubscription = async () => {
      const subscriptionParam = searchParams.get("subscriptionType");
      if (subscriptionParam) {
        setSubType(subscriptionParam);
      }
    };
    fetchSubscription();
  }, [searchParams]);

  return (
    <div>
      <div>thanks for successfully sending {amount}$</div>
      {user && <SubscriptionMessage subType={subType} />}
    </div>
  );
};

export default Page;
