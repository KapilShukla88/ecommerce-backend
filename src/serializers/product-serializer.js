import { productSchemaFields } from "../models/product-model.js";
import masterSerializer from "./master-serializer.js";

export const productSerializer = (body, addedFields) => {
  const requestObject = { ...body, ...addedFields };
  return masterSerializer(requestObject, productSchemaFields);
};
