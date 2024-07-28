import { param } from "express-validator";
import { errorValidatorResponse } from "./error-validator.js";

export const searchValidator = [
  param("productName")
    .notEmpty()
    .withMessage("Product name is required.")
    .isLength({ min: 1 })
    .withMessage("Minimum two character needed."),
  errorValidatorResponse,
];
