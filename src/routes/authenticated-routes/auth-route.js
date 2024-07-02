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

authRoute.post(
  "/signup",
  signUpValidator,
  verifyEmail,
  authController.register
);

authRoute.post(
  "/login",
  loginValidator,
  verifyLoginEmail,
  authController.login
);

export default authRoute;
