import express from "express";
import authRoute from "./auth-route.js";
import productRoute from "./products-route.js";
import cartRoute from "./cart-route.js";
import paymentRoute from "./payment-route.js";
import orderRoute from "./order-route.js";

const authenticatedRoute = express();

/**
 * @description route for authentication
 * GET "v1/main/auth"
 */
authenticatedRoute.use("/auth", authRoute);

/**
 * @description authenticated products routes
 */
authenticatedRoute.use("/products", productRoute);

/**
 * @description authenticated cart route
 */
authenticatedRoute.use("/cart", cartRoute);

/**
 * @description payment routes
 */
authenticatedRoute.use("/payment", paymentRoute);

/**
 * @description orders routes
 */
authenticatedRoute.use("/orders", orderRoute);

export default authenticatedRoute;
