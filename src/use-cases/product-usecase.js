import { putAWSObject } from "../services/aws-service.js";
import { AWS_CDN_URL } from "../resources/constants.js";

const createProduct = async (productObject, imageFiles, user, { productRepository }) => {
  const { images = [], ...body } = productObject;
  let imagesData = [];


  if(imageFiles){

  if(Array.isArray(imageFiles?.images)){
    imageFiles?.images.forEach((item) => {
      images.push({
        alt_text: body.images,
        url: item.name,
        buffer: item.data,
        contentLength: item?.size,
        imageType: item?.mimeType,
      })
    })
  }else{
    images.push({
      alt_text: body.images,
      url: imageFiles.images.name,
      buffer: imageFiles.images.data,
      contentLength: imageFiles.images?.size,
      imageType: imageFiles.images?.mimeType,
    })
  }

  for (const image of images) {
    const fileSuffix = `image-${Date.now()}`;
    const fileName = `${user.first_name}/${fileSuffix}-${image.url}`;
    const awsObject = {
      fileName: fileName,
      contentType: image.imageType,
      body: image.buffer,
    };

    await putAWSObject(
      awsObject.fileName,
      awsObject.body,
      awsObject.contentType,
      image.contentLength
    );

    imagesData.push({ url: AWS_CDN_URL + fileName, alt_text: image.alt_text });
  }

}

  const payload = {
    ...body,
    images: imagesData,
  };
  const productResponse = await productRepository.save(payload);

  if (productResponse) {
    return productResponse;
  }

  throw new Error("Something went wrong.");
};

const getAllProducts = async (reqQuery, { productRepository }) => {
  let filtersQuery = {
    is_deleted: false,
  };

  if (reqQuery.categories) {
    filtersQuery.category = { $in: JSON.parse(reqQuery.categories) };
  }

  if (reqQuery.lowPrice || reqQuery.highPrice) {
    if (reqQuery.lowPrice && reqQuery.highPrice) {
      filtersQuery.price = {
        $gt: Number.parseInt(reqQuery.lowPrice) || 0,
        $lt: Number.parseInt(reqQuery.highPrice) || 0,
      };
    } else if (reqQuery.lowPrice) {
      filtersQuery.price = {
        $gt: Number.parseInt(reqQuery.lowPrice) || 0,
      };
    } else {
      reqQuery.price = {
        $lt: Number.parseInt(reqQuery.highPrice) || 0,
      };
    }
  }

  if (reqQuery.brands) {
    filtersQuery.brand = { $in: JSON.parse(reqQuery.brands) };
  }
  const products = await productRepository.list(filtersQuery);
  return products;
};

const getPopularProducts = async (query, { productRepository }) => {
  const products = await productRepository.list(query, 0, 12);

  return products;
};

const deleteProduct = async (productId, { productRepository }) => {
  const deletedProduct = await productRepository.updateOne(
    { _id: productId },
    { is_deleted: true }
  );

  return deletedProduct;
};

const updateProduct = async (
  productId,
  productObject,
  { productRepository }
) => {
  const response = await productRepository.updateOne(
    { _id: productId },
    productObject
  );

  return response;
};

const getProduct = async (productId, { productRepository }) => {
  const response = await productRepository.findOne({ _id: productId });
  return response;
};

const saveProductReview = async (product, userReview) => {
  const isReviewed = product.reviews.find((review) =>
    review?.user?.equals(userReview.user)
  );

  if (isReviewed) {
    isReviewed.comment = userReview.comment || "";
    isReviewed.rating = userReview.rating;
    isReviewed.title = userReview.title || "";
  } else {
    product.reviews.push(userReview);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((review) => {
    avg = avg + review.rating;
  });

  product.product_ratings = avg / product.reviews.length;

  return await product.save();
};

const deleteProductReview = async (comingReviewId, product) => {
  const reviewResponse = product.reviews.filter((review) =>
    review._id.equals(comingReviewId)
  );

  product.reviews = reviewResponse;

  const response = await product.save();

  return response;
};

export default {
  createProduct,
  getAllProducts,
  deleteProduct,
  updateProduct,
  getProduct,
  saveProductReview,
  deleteProductReview,
  getPopularProducts,
};
