import express from "express";
import {
  signUpValidator,
  loginValidator,
} from "../../serializers/validators/user-validator.js";
import authController from "../../controller/auth-controller.js";
import {
  verifyEmail,
  verifyLoginEmail,
} from "../../middleware/verify-email.js";

const authRoute = express();

/**
 * @description route to signup the user
 * GET "v1/main/auth/signup"
 * @Validator validate the email, password and firstName
 * @body  `{email, password, firstName, lastName}`
 * Controller - use to register the user
 */
authRoute.post(
  "/signup",
  signUpValidator,
  verifyEmail,
  authController.register
);

/**
 * @description route to login the user and return the userdetails with refresh and access token
 * GET "v1/auth/login"
 * @Validator validate the email and password
 * @body  `{email, password}`
 * Controller - verify email and password use to login the user and send the user details and tokens
 */
authRoute.post(
  "/login",
  loginValidator,
  verifyLoginEmail,
  authController.login
);

export default authRoute;
