/**
 * @description use to search the product
 * @param {*} productName products product name
 * @param {*} productRepository product mongodb model class service
 * @returns `[]`
 */
export const searchUseCase = async (productName, { productRepository }) => {
  const response = await productRepository.list({
    name: { $regex: "^" + productName, $options: "i" },
  });

  const products = [];

  response?.forEach((product) => {
    const productData = {
      _id: product?._id || "",
      name: product?.name || "",
      price: product?.price || 0,
      product_rating: product?.product_ratings || 0,
      image: product?.images?.[0] || null,
    };
    products.push(productData);
  });

  return products;
};
