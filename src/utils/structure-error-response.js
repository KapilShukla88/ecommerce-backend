const structureErrorResponse = (response) => {
  return {
    statusCode: 400,
    message: response?.[0]?.msg,
  };
};

export default structureErrorResponse;
