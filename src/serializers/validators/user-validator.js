import { body } from "express-validator";
import { errorValidatorResponse } from "./error-validator.js";

const signUpValidator = [
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("First name field should not be empty.")
    .isLength({ max: 10 })
    .withMessage("First name should not be more than 10 characters"),
  body("lastName")
    .optional()
    .isLength({ max: 10 })
    .withMessage("Last name should not be more than 10 characters"),
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email field should not be empty.")
    .trim()
    .isEmail()
    .withMessage("Please enter valid email."),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password field should not be empty.")
    .isLength({ min: 8 })
    .withMessage("Password should have minimum 8 characters"),
  errorValidatorResponse,
];

const loginValidator = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("Email field should not be empty.")
    .trim()
    .isEmail()
    .withMessage("Please enter valid email."),
  body("password")
    .not()
    .isEmpty()
    .withMessage("Password field should not be empty.")
    .isLength({ min: 8 })
    .withMessage("Password should have minimum 8 characters"),
  errorValidatorResponse,
];

export { signUpValidator, loginValidator };
