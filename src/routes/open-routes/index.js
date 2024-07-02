import express from "express";
import products from "./products-route.js";
import refreshTokenRoute from "./refresh-token-route.js";

const router = express();

router.use("/products", products);

router.use("/refreshToken", refreshTokenRoute);

export default router;
