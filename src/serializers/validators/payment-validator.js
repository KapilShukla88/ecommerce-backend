import { body } from "express-validator";
import { errorValidatorResponse } from "./error-validator.js";

export const paymentValidator = [
  body("amount").not().isEmpty().withMessage("Amount is required."),
  errorValidatorResponse,
];
