import express from "express";
import apiAuthManager from "../../middleware/api-auth-manager.js";
import cartController from "../../controller/cart-controller.js";
import {
  createCartValidator,
  deleteCartValidator,
} from "../../serializers/validators/cart-validator.js";

const cartRoute = express();

/**
 * @route /v1/main/cart
 * @method GET
 * @description to get all the cart items of the authenticated user
 */
cartRoute.get("/", apiAuthManager.auth, cartController.getAllCartItems);

/**
 * @route /v1/main/cart/cart-count
 * @method GET
 * @description to get the total count of added cart products
 */
cartRoute.get("/cart-count", apiAuthManager.auth, cartController.getCartCount);

/**
 * route : /v1/main/cart
 * @description this function use add product on a cart
 * @body {productId, quantity}
 * @returns `{message, totalCount}`
 */
cartRoute.post(
  "/",
  apiAuthManager.auth,
  createCartValidator,
  cartController.addToCart
);

/**
 * route : /v1/main/cart/:productId
 * @description this function is used to delete the cart
 * @param productId
 * @returns `{message, totalCount}`
 */
cartRoute.delete(
  "/:productId",
  apiAuthManager.auth,
  deleteCartValidator,
  cartController.deleteCartItem
);

export default cartRoute;
