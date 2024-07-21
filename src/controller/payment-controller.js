import Stripe from "stripe";
import { processPaymentUseCase } from "../use-cases/payment-usecase.js";

const stripe = new Stripe(
  "sk_test_51N7tJLSC6WMHZtvq4El8khJHGFHt1D9arNC5USQ9ZgxULJ6aa4kQWrw9vBbZCfVaO0NnocgIrYYtpt3oddIQC3Qg00p2iOM9Ly"
);

const processPayment = async (req, res) => {
  try {
    const response = await processPaymentUseCase(req.body.amount, { stripe });

    res
      .status(200)
      .json({ success: true, client_secret: response?.client_secret });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Something went wrong.Unable to delete the product.",
    });
  }
};

export { processPayment };
