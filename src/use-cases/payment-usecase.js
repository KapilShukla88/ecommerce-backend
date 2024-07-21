const processPaymentUseCase = async (amount, { stripe }) => {
  const myPayment = await stripe.paymentIntents.create({
    amount: amount,
    currency: "inr",
    description: "test description",
    metadata: {
      company: "Finestdeals",
    },
  });

  return myPayment;
};

export { processPaymentUseCase };
