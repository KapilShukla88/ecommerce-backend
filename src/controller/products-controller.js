import productUseCase from "../use-cases/product-usecase.js";
import ProductRepository from "../repositories/product-repository.js";
import { productSerializer } from "../serializers/product-serializer.js";

/**
 * @description to create the new product
 * @param {*} req {images, name, price, stock, etc.}
 * @returns `{....}`
 */
const createNewProduct = async (req, res) => {
  let createProductObject = productSerializer(req.body);
  let payload = {
    ...createProductObject,
    images: [],
  };
  if (Array.isArray(req.files?.images)) {
    req.files?.images.forEach((element) => {
      payload.images.push({
        alt_text: req.body.images,
        url: element.name,
        buffer: element.data,
        contentLength: element.size,
        imageType: element.mimetype,
      });
    });
  } else {
    payload.images.push({
      alt_text: req.body.images,
      url: req.files.images.name,
      buffer: req.files.images.data,
      contentLength: req.files.images.size,
      imageType: req.files.images.mimetype,
    });
  }
  try {
    const productRepository = new ProductRepository();
    const response = await productUseCase.createProduct(payload, req.user, {
      productRepository,
    });

    res.status(201).send(response);
  } catch (error) {
    res
      .status(500)
      .send({ statusCode: 500, message: error ?? "Server error." });
  }
};

/**
 * @description to get the all products listed on the website
 * @param {*} req {query: category=[]&lowPrice, highPrice}
 * @return `[{....}, {....}]`
 */
const getAllProducts = async (req, res) => {
  try {
    const productRepository = new ProductRepository();

    const response = await productUseCase.getAllProducts(req.query, {
      productRepository,
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({
      statusCode: 500,
      message: "Something went wrong. Unable to fetch products",
    });
  }
};

/**
 * @description to get the popular products which has rating more than or equal to 4
 * @returns `[{...},{...}]`
 */
const getPopularProducts = async (_req, res) => {
  try {
    const query = {
      product_ratings: { $gte: 4 },
      is_deleted: false,
    };
    const productRepository = new ProductRepository();
    const products = await productUseCase.getPopularProducts(query, {
      productRepository,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Something went wrong. Unable to fetch products",
    });
  }
};

/**
 * @description to delete the product from the database
 * @param {*} req {productId}
 * @return `{statusCode, message}`
 */
const deleteProduct = async (req, res) => {
  try {
    const productRepository = new ProductRepository();
    await productUseCase.deleteProduct(req.params.id, {
      productRepository,
    });

    res.status(200).json({ statusCode: 200, message: "Successfully deleted" });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Something went wrong. Unable to delete the product.",
    });
  }
};

/**
 * @description update the product details
 * @param {*} req {category, price, etc.}
 * @returns `{statusCode, message}`
 */
const updateProduct = async (req, res) => {
  const productRequestObject = productSerializer(req.body);
  try {
    const productRepository = new ProductRepository();
    await productUseCase.updateProduct(
      { _id: req.params.id },
      productRequestObject,
      { productRepository }
    );

    res.status(200).json({ statusCode: 200, message: "Updated Successfully" });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Something went wrong. Unable to update the product.",
    });
  }
};

/**
 * @description to get the single product details using the productId
 * @param {*} req {productId}
 * @returns `{.....}`
 */
const getProduct = async (req, res) => {
  try {
    const productRepository = new ProductRepository();

    const response = await productUseCase.getProduct(req.params.productId, {
      productRepository,
    });

    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Something went wrong. Unable to get the product.",
    });
  }
};

/**
 * @description to add the new review on a product by using the productId
 * @param {*} req {params: {productId}, body: {rating, comment}}
 * @returns `{statusCode, message}`
 */
const submitReview = async (req, res) => {
  const { rating, comment, title } = req.body;
  const productId = req.params.productId;
  try {
    let userReview = {
      user: req.user._id,
      name: req.user.first_name + " " + req.user.last_name,
      rating: Number.parseInt(rating),
      title: title,
      comment: comment,
    };

    const productRepository = new ProductRepository();
    const productResponse = await productUseCase.getProduct(productId, {
      productRepository,
    });

    if (!productResponse)
      return res
        .status(400)
        .json({ statusCode: 400, message: "Product not found." });

    const result = await productUseCase.saveProductReview(
      productResponse,
      userReview
    );

    if (result) {
      res.status(201).json(result);
      return;
    }

    res
      .status(400)
      .json({ statusCode: 400, message: "Unable to update the review." });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Something went wrong. Unable to add/update the review.",
    });
  }
};

/**
 * @description get the product reviews
 * @param {*} req {productId}
 * @returns `{statusCode, reviews: []}`
 */
const getProductReview = async (req, res) => {
  try {
    const productRepository = new ProductRepository();
    const productResponse = await productUseCase.getProduct(
      req.params.productId,
      {
        productRepository,
      }
    );

    res.status(200).json({
      statusCode: 200,
      reviews: productResponse?.reviews || [],
    });
  } catch (error) {
    res.status(error?.statusCode || 500).send({
      statusCode: error?.statusCode || 500,
      message: error?.message ?? "Something went wrong.",
    });
  }
};

/**
 * @description to delete the product review
 * @param {*} req {productId}
 * @returns `{....}`
 */
const deleteProductReview = async (req, res) => {
  try {
    const productRepository = new ProductRepository();
    const productResponse = await productUseCase.getProduct(
      req.params.productId,
      {
        productRepository,
      }
    );

    const response = await productUseCase.deleteProductReview(
      req.params.productId,
      productResponse
    );

    res.status(200).json(response);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Something went wrong.Unable to delete the product.",
    });
  }
};

export {
  createNewProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProduct,
  submitReview,
  getProductReview,
  deleteProductReview,
  getPopularProducts,
};
