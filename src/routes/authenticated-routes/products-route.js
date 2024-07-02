import express from "express";
import {
  createNewProduct,
  deleteProduct,
  updateProduct,
  submitReview,
  deleteProductReview,
} from "../../controller/products-controller.js";
import apiAuthManager from "../../middleware/api-auth-manager.js";
import {
  addNewProductValidator,
  deleteProductReviewValidator,
  deleteProductValidator,
  reviewValidator,
  updateProductValidator,
} from "../../serializers/validators/product-validator.js";

const productRoute = express();

productRoute.post(
  "/",
  addNewProductValidator,
  apiAuthManager.auth,
  apiAuthManager.authorizerRoles("admin"),
  createNewProduct
);

productRoute.delete(
  "/:productId",
  deleteProductValidator,
  apiAuthManager.auth,
  apiAuthManager.authorizerRoles("admin"),
  deleteProduct
);

productRoute.put(
  "/:productId",
  updateProductValidator,
  apiAuthManager.auth,
  apiAuthManager.authorizerRoles("admin"),
  updateProduct
);

productRoute.post(
  "/review/:productId",
  apiAuthManager.auth,
  reviewValidator,
  submitReview
);

productRoute.delete(
  "/reviews/:productId/:id",
  apiAuthManager.auth,
  apiAuthManager.authorizerRoles("admin"),
  deleteProductReviewValidator,
  deleteProductReview
);

export default productRoute;
