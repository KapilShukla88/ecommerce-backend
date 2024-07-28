import Stripe from "stripe";
import { processPaymentUseCase } from "../use-cases/payment-usecase.js";

// stripe secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @description to get the client secret of the stripe payment gateway
 * @param {*} req {amount} order amount
 * @returns `{success, client_secret}`
 */
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
