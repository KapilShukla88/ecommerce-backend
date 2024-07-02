const masterSerializer = (requestObject, schemaFields) => {
  let validateRequestObject = {};

  let validateRequestFields = Object.keys(requestObject)?.filter((element) =>
    schemaFields.includes(element)
  );
  for (const field of validateRequestFields) {
    if (field in requestObject) {
      validateRequestObject[field] = requestObject[field];
    }
  }

  return validateRequestObject;
};

export default masterSerializer;
