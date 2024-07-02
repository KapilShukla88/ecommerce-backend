import productUseCase from "../use-cases/product-usecase.js";
import ProductRepository from "../repositories/product-repository.js";
import { productSerializer } from "../serializers/product-serializer.js";

const createNewProduct = async (req, res) => {
  // console.log("product body =>>", req.body, req.files.images);
  // res.send("Ok")
  // return;

  let createProductObject = productSerializer(req.body);
  let payload = {
    ...createProductObject,
    images: [
      {
        alt_text: req.body.images,
        url: req.files.images.name,
        buffer: req.files.images.data,
        contentLength: req.files.images.size,
        imageType: req.files.images.mimetype,
      },
    ],
  };
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

const getPopularProducts = async (req, res) => {
  try {
    const query = {
      product_ratings: { $gte: 4 },
      is_deleted: false,
    };
    const productRepository = new ProductRepository();
    const products = await productUseCase.getPopularProducts(query, {
      productRepository,
    });

    res.status(200).json({
      data: products,
    });
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Something went wrong. Unable to fetch products",
    });
  }
};

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

const submitReview = async (req, res) => {
  const { rating, comment, title } = req.body;
  const productId = req.params.id;
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
      req.params.id,
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
