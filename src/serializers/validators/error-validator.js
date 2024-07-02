import { validationResult } from "express-validator";
import structureErrorResponse from "../../utils/structure-error-response.js";

const errorValidatorResponse = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).send(structureErrorResponse(result.array()));
  }
  next();
};

export { errorValidatorResponse };
