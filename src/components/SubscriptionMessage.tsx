import React, { FC, useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";

interface IProps {
  subType: string | null;
}

const SubscriptionMessage: FC<IProps> = ({ subType }) => {
  return <div>{subType}</div>;
};

export default SubscriptionMessage;
