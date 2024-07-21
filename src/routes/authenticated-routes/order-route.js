import express from "express";
import apiAuthManager from "../../middleware/api-auth-manager.js";
import {
  addNewOrderController,
  getMyAllOrders,
} from "../../controller/order-controller.js";

const orderRoute = express();

//TODO: add validator
orderRoute.post("/new", apiAuthManager.auth, addNewOrderController);

orderRoute.get("/me", apiAuthManager.auth, getMyAllOrders);

export default orderRoute;
