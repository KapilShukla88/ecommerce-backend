import { body } from "express-validator";
import { errorValidatorResponse } from "./error-validator.js";

const signUpValidator = [
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("The first name field cannot be empty.")
    .isLength({ max: 10 })
    .withMessage("The first name must be no longer than 10 characters."),
  body("lastName")
    .optional()
    .isLength({ max: 10 })
    .withMessage("The last name must be no longer than 10 characters."),
  body("email")
    .not()
    .isEmpty()
    .withMessage("The email field cannot be empty.")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address."),
  body("password")
    .not()
    .isEmpty()
    .withMessage("The password field cannot be empty.")
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long."),
  errorValidatorResponse,
];

const loginValidator = [
  body("email")
    .not()
    .isEmpty()
    .withMessage("The email field cannot be empty.")
    .trim()
    .isEmail()
    .withMessage("Please enter a valid email address."),
  body("password")
    .not()
    .isEmpty()
    .withMessage("The password field cannot be empty.")
    .isLength({ min: 8 })
    .withMessage("The password must be at least 8 characters long."),
  errorValidatorResponse,
];

export { signUpValidator, loginValidator };
