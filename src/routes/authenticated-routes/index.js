import express from "express";
import authRoute from "./auth-route.js";
import productRoute from "./products-route.js";
import cartRoute from "./cart-route.js";
import paymentRoute from "./payment-route.js";
import orderRoute from "./order-route.js";

const authenticatedRoute = express();

/**
 * @description route for authentication
 * GET "v1/main/auth/*"
 */
authenticatedRoute.use("/auth", authRoute);

/**
 * @description authenticated products routes
 * @route /v1/main/products/*
 */
authenticatedRoute.use("/products", productRoute);

/**
 * @description authenticated cart route
 * @route /v1/main/cart/*
 */
authenticatedRoute.use("/cart", cartRoute);

/**
 * @description payment routes
 * @route /v1/main/payment/*
 */
authenticatedRoute.use("/payment", paymentRoute);

/**
 * @description orders routes
 * @route /v1/main/orders/*
 */
authenticatedRoute.use("/orders", orderRoute);

export default authenticatedRoute;
