import express from "express";
import { refreshTokenValidator } from "../../serializers/validators/refresh-token-validator.js";
import refreshTokenController from "../../controller/refresh-token-controller.js";

const refreshTokenRoute = express();

refreshTokenRoute.get(
  "/",
  refreshTokenValidator,
  refreshTokenController.generateRefreshToken
);

refreshTokenRoute.delete(
  "/",
  refreshTokenValidator,
  refreshTokenController.deleteRefreshToken
);

export default refreshTokenRoute;
