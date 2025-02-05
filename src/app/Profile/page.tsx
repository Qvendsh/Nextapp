"use client";
import React from "react";
import { UserAuth } from "@/context/AuthContext";
import SubscriptionMessage from "@/components/SubscriptionMessage";

const Page = () => {
  const { user } = UserAuth();
  return (
    <div className="max-w-6xl mx-auto p-10   text-center border m-10 rounded-md">
      hello {user?.displayName}
      {user && <SubscriptionMessage />}
    </div>
  );
};

export default Page;
