import React from "react";

const Page = ({
  searchParams: { amount },
}: {
  searchParams: { amount: string };
}) => {
  const amountNumber = parseFloat(amount);
  return (
    <div>
      <div>thanks for successfully sending {amountNumber}$</div>
    </div>
  );
};

export default Page;
