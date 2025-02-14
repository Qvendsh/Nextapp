export const plans = [
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_aEU14y1tw8yxgsU001"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1Qp9YJP5kmZAW2pxaciqdMem"
        : "",
    price: 59.99,
    duration: "/month",
  },
  {
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_eVa28C1tw6qpa4wdQS"
        : "",
    priceId:
      process.env.NODE_ENV === "development"
        ? "price_1Qp9jkP5kmZAW2pxp23xV9LK"
        : "",
    price: 159.99,
    duration: "/year",
  },
];
