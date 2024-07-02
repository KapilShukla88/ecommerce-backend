import { body, param, check } from "express-validator";
import { errorValidatorResponse } from "./error-validator.js";
import {
  PRODUCT_CATEGORY_ENUM,
  PRODUCT_CATEGORY,
  PRODUCT_BRAND_ENUM,
} from "../../resources/constants.js";

export const addNewProductValidator = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Please enter product name.")
    .isString()
    .withMessage("name should be of string type")
    .isLength({ max: 40 })
    .withMessage("name should of max length 40"),
  body("description")
    .not()
    .isEmpty()
    .withMessage("Please enter product description."),
  body("category")
    .not()
    .isEmpty()
    .withMessage("Please enter product category")
    .trim()
    .isIn(PRODUCT_CATEGORY_ENUM)
    .withMessage(
      `Category should be from these ${PRODUCT_CATEGORY_ENUM.join(", ")}`
    ),
  body("brand")
    .not()
    .isEmpty()
    .withMessage("Please enter product brand name.")
    .trim()
    .isIn(PRODUCT_BRAND_ENUM)
    .withMessage(
      `Brand should be from these brands ${PRODUCT_BRAND_ENUM.join(", ")}`
    ),
  body("price")
    .not()
    .isEmpty()
    .withMessage("Please enter price of a product.")
    .isNumeric()
    .withMessage("Price should be of number type")
    .trim()
    .isLength({ max: 8 })
    .withMessage("Price should be less than or equal to 8 digit."),
  body("stock")
    .not()
    .isEmpty()
    .withMessage("Please enter number of stocks available.")
    .isNumeric()
    .withMessage("Stocks should of integer type")
    .trim()
    .isLength({ max: 2 })
    .withMessage("Stocks should not be more than or equal to 100"),
  errorValidatorResponse,
];

export const deleteProductValidator = [
  param("productId").notEmpty().withMessage("Product id is required."),
  errorValidatorResponse,
];

export const updateProductValidator = [
  param("productId").notEmpty().withMessage("Product id is required."),
  body("name").optional().notEmpty().withMessage("Name field is required."),
  body("description")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Please enter product description."),
  body("category")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Please enter product category")
    .trim()
    .isIn(PRODUCT_CATEGORY_ENUM)
    .withMessage(
      `Category should be from these ${PRODUCT_CATEGORY_ENUM.join(", ")}`
    ),
  body("brand")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Please enter product brand name.")
    .trim()
    .isIn(PRODUCT_BRAND_ENUM)
    .withMessage(
      `Brand should be from these brands ${PRODUCT_BRAND_ENUM.join(", ")}`
    ),
  body("price")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Please enter price of a product.")
    .isNumeric()
    .withMessage("Price should be of number type")
    .trim()
    .isLength({ max: 8 })
    .withMessage("Price should be less than or equal to 8 digit."),
  body("stock")
    .not()
    .isEmpty()
    .withMessage("Please enter number of stocks available.")
    .isNumeric()
    .withMessage("Stocks should of integer type")
    .trim()
    .isLength({ max: 2 })
    .withMessage("Stocks should not be more than or equal to 100"),
  errorValidatorResponse,
];

export const reviewValidator = [
  param("productId").notEmpty().withMessage("Product id is required."),
  body("rating")
    .notEmpty()
    .withMessage("Please give at least 1 rating.")
    .isNumeric()
    .withMessage("Rating should be of type number."),
  body("title")
    .notEmpty()
    .withMessage("Title field should not be empty.")
    .isLength({ max: 30 })
    .withMessage("Title should not exceed more than 30 characters"),
  body("comment")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("Comment should not exceed more than 50 characters."),
  errorValidatorResponse,
];

export const getReviewValidator = [
  param("productId").notEmpty().withMessage("Product id is required."),
  errorValidatorResponse,
];

export const deleteProductReviewValidator = [
  param("productId").notEmpty().withMessage("Product id is required"),
  param("id").notEmpty().withMessage("Review id is required."),
  errorValidatorResponse,
];
