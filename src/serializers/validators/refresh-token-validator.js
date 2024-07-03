import { body } from "express-validator";
import { errorValidatorResponse } from "./error-validator.js";

export const refreshTokenValidator = [
  body("refresh_token").not().isEmpty().withMessage("A refresh token is required."),
  errorValidatorResponse,
];
