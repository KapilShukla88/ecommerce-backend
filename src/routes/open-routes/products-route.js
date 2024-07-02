import express from "express";
import { getReviewValidator } from "../../serializers/validators/product-validator.js";
import {
  getAllProducts,
  getPopularProducts,
  getProduct,
  getProductReview,
} from "../../controller/products-controller.js";

const productRoute = express();

/**
 * @description List all products
 * GET "v1/main/products"
 * Validator - optional
 * Controller
 */
productRoute.get("/", getAllProducts);

productRoute.get("/popular-products", getPopularProducts);

productRoute.get("/:productId", getProduct);

productRoute.get("/review/:productId", getReviewValidator, getProductReview);

export default productRoute;
