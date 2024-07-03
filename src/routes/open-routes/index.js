import express from "express";
import products from "./products-route.js";
import refreshTokenRoute from "./refresh-token-route.js";

const router = express();

/**
  @description this route use to get all the products, reviews etc.
  route - "/v1/main/products/*"
*/
router.use("/products", products);

/**
  @description to get and delete the refresh token
  route - "/v1/main/refreshToken/*"
*/
router.use("/refreshToken", refreshTokenRoute);

export default router;
