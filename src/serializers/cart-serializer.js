import { cartSchemaFields } from "../models/cart-model.js";
import masterSerializer from "./master-serializer.js";

export const cartSerializer = (body, addedFields) => {
  const requestObject = { ...body, ...addedFields };
  return masterSerializer(requestObject, cartSchemaFields);
};
