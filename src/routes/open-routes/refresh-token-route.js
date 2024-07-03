import express from "express";
import { refreshTokenValidator } from "../../serializers/validators/refresh-token-validator.js";
import refreshTokenController from "../../controller/refresh-token-controller.js";

const refreshTokenRoute = express();

/**
 * @description get the refresh token
 * GET "v1/main/refreshToken"
 * @Validator refreshTokenValidator validate whether refresh_token is passed on the body or not
 * @body refresh_token
 * Controller - return the verified refresh token
 */
refreshTokenRoute.get(
  "/",
  refreshTokenValidator,
  refreshTokenController.generateRefreshToken
);

/**
 * @description to delete the refresh token
 * GET "v1/main/refreshToken"
 * @Validator refreshTokenValidator validate whether refresh_token is passed on the body or not
 * @body refresh_token
 * Controller - return the deleted refresh token
 */
refreshTokenRoute.delete(
  "/",
  refreshTokenValidator,
  refreshTokenController.deleteRefreshToken
);

export default refreshTokenRoute;
