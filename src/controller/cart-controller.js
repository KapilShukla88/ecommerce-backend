import CartRepository from "../repositories/cart-repository.js";
import {
  addToCartUseCase,
  deleteCartItemUseCase,
  getAllProductUseCase,
  getCartCountUseCase,
} from "../use-cases/cart-usecase.js";

/**
 * @description to add the product into the cart
 * @param {*} req req.body - {quantity, productId} and req.user -current login user data
 * @param {*} res send the cart response
 * @return `{message: "", totalCount: 0}`
 */
export const addToCart = async (req, res) => {
  try {
    const cartRepository = new CartRepository();
    const response = await addToCartUseCase(req.body, req.user, {
      cartRepository,
    });
    res.status(201).json({
      message: "Added to cart.",
      total_count: response?.total_count || 0,
    });
  } catch (error) {
    console.log("error =>>", error);
    res.status(500).json({
      statusCode: 500,
      message: error?.message || "Something went wrong!",
    });
  }
};

/**
 * @description to get all the cart items
 * @param {*} req
 * @param {*} res
 */
const getAllCartItems = async (req, res) => {
  try {
    const cartRepository = new CartRepository();
    const response = await getAllProductUseCase(req.user, { cartRepository });

    res.status(200).json(response);
  } catch (error) {
    console.log("error =>>", error);
    res.status(500).json({
      statusCode: 500,
      message: error?.message || "Something went wrong!",
    });
  }
};

const getCartCount = async (req, res) => {
  try {
    const cartRepository = new CartRepository();
    const response = await getCartCountUseCase(req.user?._id, {
      cartRepository,
    });

    res.status(200).json({
      message: "Success",
      total_count: response,
    });
  } catch (error) {}
};

const deleteCartItem = async (req, res) => {
  try {
    const cartRepository = new CartRepository();
    const response = await deleteCartItemUseCase(req.params, req.user._id, {
      cartRepository,
    });
    res.status(201).json({
      statusCode: 200,
      message: response?.message || "Item deleted from cart successfully!",
      total_count: response?.total_count || 0,
    });
  } catch (error) {
    console.log("error =>>", error);
    res.status(500).json({
      statusCode: 500,
      message: error?.message || "Something went wrong!",
    });
  }
};

const cartController = {
  addToCart,
  getAllCartItems,
  deleteCartItem,
  getCartCount,
};

export default cartController;
