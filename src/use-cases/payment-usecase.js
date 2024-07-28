/**
 * @description to get the client secret key on the basis of amount
 * @param {*} amount product amount
 * @param {*} stripe stripe service
 * @returns `{secretKey}`
 */
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
