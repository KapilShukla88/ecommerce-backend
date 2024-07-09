import express from "express";
import apiAuthManager from "../../middleware/api-auth-manager.js";
import cartController from "../../controller/cart-controller.js";
import {
  createCartValidator,
  deleteCartValidator,
} from "../../serializers/validators/cart-validator.js";

const cartRoute = express();

cartRoute.get("/", apiAuthManager.auth, cartController.getAllCartItems);

cartRoute.post(
  "/",
  apiAuthManager.auth,
  createCartValidator,
  cartController.addToCart
);

cartRoute.delete(
  "/:cartId/:productId",
  apiAuthManager.auth,
  deleteCartValidator,
  cartController.deleteCartItem
);

export default cartRoute;
