import ProductRepository from "../repositories/product-repository.js";
import { searchUseCase } from "../use-cases/search-usecase.js";

/**
 * @description to get the products  name and rating
 * @param {*} req {productName}
 * @returns `{price, name, rating}`
 */
export const searchController = async (req, res) => {
  try {
    const productRepository = new ProductRepository();
    const searchResponse = await searchUseCase(req.params.productName, {
      productRepository,
    });

    res.status(200).json(searchResponse);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Something went wrong.Unable to find the products.",
    });
  }
};
