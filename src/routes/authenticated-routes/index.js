import express from "express";
import authRoute from "./auth-route.js";
import productRoute from "./products-route.js";

const authenticatedRoute = express();

authenticatedRoute.use("/auth", authRoute);
authenticatedRoute.use("/products", productRoute);

export default authenticatedRoute;
