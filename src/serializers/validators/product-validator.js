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
    .withMessage("Please provide the product name.")
    .isString()
    .withMessage("The name must be a string.")
    .isLength({ max: 40 })
    .withMessage("The name must have a maximum length of 40 characters."),
  body("description")
    .not()
    .isEmpty()
    .withMessage("Please provide a product description."),
  body("category")
    .not()
    .isEmpty()
    .withMessage("Please specify the product category.")
    .trim()
    .isIn(PRODUCT_CATEGORY_ENUM)
    .withMessage(
      `The category must be one of the following:${PRODUCT_CATEGORY_ENUM.join(
        ", "
      )}`
    ),
  body("brand")
    .not()
    .isEmpty()
    .withMessage("Please provide the product brand name.")
    .trim()
    .isIn(PRODUCT_BRAND_ENUM)
    .withMessage(
      `The brand must be one of the following: ${PRODUCT_BRAND_ENUM.join(", ")}`
    ),
  body("price")
    .not()
    .isEmpty()
    .withMessage("Please enter the product price.")
    .isNumeric()
    .withMessage("The price must be a number.")
    .trim()
    .isLength({ max: 8 })
    .withMessage("The price must be no more than 8 digits long."),
  body("stock")
    .not()
    .isEmpty()
    .withMessage("Please enter the number of stocks available.")
    .isNumeric()
    .withMessage("The stock quantity must be an integer.")
    .trim()
    .isLength({ max: 2 })
    .withMessage("The stock quantity must be less than 100."),
  errorValidatorResponse,
];

export const deleteProductValidator = [
  param("productId").notEmpty().withMessage("A product ID is required."),
  errorValidatorResponse,
];

export const updateProductValidator = [
  param("productId").notEmpty().withMessage("A product ID is required."),
  body("name")
    .optional()
    .notEmpty()
    .withMessage("Please provide the product name.")
    .isString()
    .withMessage("The name must be a string.")
    .isLength({ max: 40 })
    .withMessage("The name must have a maximum length of 40 characters."),
  body("description")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Please provide a product description."),
  body("category")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Please specify the product category.")
    .trim()
    .isIn(PRODUCT_CATEGORY_ENUM)
    .withMessage(
      `The category must be one of the following:${PRODUCT_CATEGORY_ENUM.join(
        ", "
      )}`
    ),
  body("brand")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Please provide the product brand name.")
    .trim()
    .isIn(PRODUCT_BRAND_ENUM)
    .withMessage(
      `The brand must be one of the following: ${PRODUCT_BRAND_ENUM.join(", ")}`
    ),
  body("price")
    .optional()
    .not()
    .isEmpty()
    .withMessage("Please enter the product price.")
    .isNumeric()
    .withMessage("The price must be a number.")
    .trim()
    .isLength({ max: 8 })
    .withMessage("The price must be no more than 8 digits long."),
  body("stock")
    .not()
    .isEmpty()
    .withMessage("Please enter number of stocks available.")
    .isNumeric()
    .withMessage("The stock quantity must be an integer.")
    .trim()
    .isLength({ max: 2 })
    .withMessage("The stock quantity must be less than 100."),
  errorValidatorResponse,
];

export const reviewValidator = [
  param("productId").notEmpty().withMessage("Product id is required."),
  body("rating")
    .notEmpty()
    .withMessage("Please provide at least one rating.")
    .isNumeric()
    .withMessage("The rating must be a number."),
  body("title")
    .optional()
    .notEmpty()
    .withMessage("The title field cannot be empty.")
    .isLength({ max: 30 })
    .withMessage("The title must not exceed 30 characters."),
  body("comment")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage("The comment must not exceed 50 characters."),
  errorValidatorResponse,
];

export const getReviewValidator = [
  param("productId").notEmpty().withMessage("Product Id is required."),
  errorValidatorResponse,
];

export const deleteProductReviewValidator = [
  param("productId").notEmpty().withMessage("Product Id is required"),
  param("id").notEmpty().withMessage("Review Id is required."),
  errorValidatorResponse,
];
