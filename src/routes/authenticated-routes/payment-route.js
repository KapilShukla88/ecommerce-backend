import express from "express";
import apiAuthManager from "../../middleware/api-auth-manager.js";
import { processPayment } from "../../controller/payment-controller.js";
import { paymentValidator } from "../../serializers/validators/payment-validator.js";

const paymentRoute = express();

paymentRoute.post(
  "/process",
  apiAuthManager.auth,
  paymentValidator,
  processPayment
);

export default paymentRoute;
