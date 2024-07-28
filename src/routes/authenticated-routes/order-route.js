import express from "express";
import apiAuthManager from "../../middleware/api-auth-manager.js";
import {
  addNewOrderController,
  getMyAllOrders,
} from "../../controller/order-controller.js";

const orderRoute = express();

/**
 * @route /v1/main/orders/new
 * @description to add the new order data into the database
 * @method POST
 * @return `{.........}`
 */
orderRoute.post("/new", apiAuthManager.auth, addNewOrderController);

/**
 * @route /v1/main/orders/me
 * @description to get the logged in users all order details
 * @method GET
 * @return `{......}`
 */
orderRoute.get("/me", apiAuthManager.auth, getMyAllOrders);

export default orderRoute;
