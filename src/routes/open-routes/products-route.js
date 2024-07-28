import express from "express";
import { getReviewValidator } from "../../serializers/validators/product-validator.js";
import {
  getAllProducts,
  getPopularProducts,
  getProduct,
  getProductReview,
} from "../../controller/products-controller.js";
import { searchValidator } from "../../serializers/validators/seaarch-validator.js";
import { searchController } from "../../controller/search-controller.js";

const productRoute = express();

/**
 * @description List all products
 * GET "v1/main/products"
 * Validator - optional
 * Controller
 */
productRoute.get("/", getAllProducts);

/**
 * @description List all popular products which has rating more than 4 or equal to 4
 * GET "v1/main/products/popular-products"
 * Validator - optional
 * Controller - getPopularProducts (to get the popular products)
 */
productRoute.get("/popular-products", getPopularProducts);

/**
 * @description get one single product by passing the product id
 * GET "v1/main/products/:productId"
 * Validator - optional
 * @query productId
 * Controller - return the single product
 */
productRoute.get("/:productId", getProduct);

/**
 * @description route to get the product review
 * GET "v1/main/products/review/:productId"
 * Validator - getReviewValidator - validate of peoductId
 * @query productId
 * Controller - return the product review
 */
productRoute.get("/review/:productId", getReviewValidator, getProductReview);

/**
 * @description search query
 * @validator productName - query is mandatory
 * @route /v1/main/products/search/:productName
 */
productRoute.get("/search/:productName", searchValidator, searchController);

export default productRoute;
