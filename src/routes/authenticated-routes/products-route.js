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

/**
 * @description route to create the new product
 * POST "v1/main/products"
 * @Validator validate the name, category, brand etc.
 * @body  `{name, category, description, brand}`
 * Controller - return the created new product
 * only admin can access this route
 */
productRoute.post(
  "/",
  addNewProductValidator,
  apiAuthManager.auth,
  apiAuthManager.authorizerRoles("admin"),
  createNewProduct
);

/**
 * @description route to delete the product from database
 * DELETE "v1/main/products/:productId"
 * @Validator validate the productId
 * @params  productId
 * only admin can access this route
 * Controller - delete the product based on the productId
 */
productRoute.delete(
  "/:productId",
  deleteProductValidator,
  apiAuthManager.auth,
  apiAuthManager.authorizerRoles("admin"),
  deleteProduct
);

/**
 * @description route to update the product details
 * PUT "v1/main/products/:productId"
 * @Validator validate the productId
 * @params  productId
 * Controller - update the existing product
 * only admin can access this route
 */
productRoute.put(
  "/:productId",
  updateProductValidator,
  apiAuthManager.auth,
  apiAuthManager.authorizerRoles("admin"),
  updateProduct
);

/**
 * @description route to add new review on a product
 * POST "v1/main/products/review/:productId"
 * @Validator validate the productId and reviews keys (rating, title)
 * @params  productId
 * @body `{rating, title, description}`
 * Controller - add new review 
 * user should be authenticated to access this route
 */
productRoute.post(
  "/review/:productId",
  apiAuthManager.auth,
  reviewValidator,
  submitReview
);

/**
 * @description route to delete the review
 * POST"v1/main/products/review/:productId/:id" id -> review id
 * @Validator validate the productId and reviews keys (rating, title)
 * @params  productId
 * @body `{rating, title, description}`
 * Controller - to delete the review 
 * user should be authenticated to access this route and only admin can access this route
 */
productRoute.delete(
  "/reviews/:productId/:id",
  apiAuthManager.auth,
  apiAuthManager.authorizerRoles("admin"),
  deleteProductReviewValidator,
  deleteProductReview
);

export default productRoute;
