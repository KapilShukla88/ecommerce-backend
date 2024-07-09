import { body, param } from "express-validator";
import { errorValidatorResponse } from "./error-validator.js";

export const createCartValidator = [
  body("cartItem.productId")
    .exists()
    .withMessage("productId is required to add on cart."),
  body("cartItem.quantity")
    .exists()
    .withMessage("Please pass quantity key with at least one product")
    .isNumeric()
    .withMessage("Quantity should be of numeric type.")
    .isFloat({ gt: 0 })
    .withMessage("Product quantity should be greater then zero."),
  errorValidatorResponse,
];

export const deleteCartValidator = [
  param("cartId").not().isEmpty().withMessage("Cart Id is required."),
  errorValidatorResponse,
];
