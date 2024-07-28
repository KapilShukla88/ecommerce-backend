import express from "express";
import apiAuthManager from "../../middleware/api-auth-manager.js";
import { processPayment } from "../../controller/payment-controller.js";
import { paymentValidator } from "../../serializers/validators/payment-validator.js";

const paymentRoute = express();

/**
 * @method POST
 * @route /v1/main/payment/process
 * @description to get the client secret of a authenticated requested user - user have to logged in
 * @body {amount} - amount is required - based on the amount secret key will release
 * @returns `{success, client_secret}`
 */
paymentRoute.post(
  "/process",
  apiAuthManager.auth,
  paymentValidator,
  processPayment
);

export default paymentRoute;
