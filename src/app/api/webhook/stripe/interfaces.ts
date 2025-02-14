interface StripeInvoice {
  subscription: string;
  customer: string;
  payment_intent: {
    status: string;
  };
}

interface User {
  email: string;
  name: string;
  customerId: string;
  priceId: string;
  hasAccess: boolean;
  nextBillingDate?: number;
}

export type { StripeInvoice, User };
