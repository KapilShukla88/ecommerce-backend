import { body } from "express-validator";
import { errorValidatorResponse } from "./error-validator.js";

export const newsLetterValidator = [
  body("email").not().isEmpty().withMessage("Email is required."),
  errorValidatorResponse,
];
