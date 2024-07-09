import CartRepository from "../repositories/cart-repository.js";
import {
  addToCartUseCase,
  deleteCartItemUseCase,
  getAllProductUseCase,
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
      totalCount: response?.total_count || 0,
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

const deleteCartItem = async (req, res) => {
  try {
    const cartRepository = new CartRepository();
    const response = await deleteCartItemUseCase(req.params, {
      cartRepository,
    });
    console.log("response =>>", response);
    res.status(201).json({
      statusCode: 200,
      message: "Item deleted from cart successfully!",
    });
  } catch (error) {}
};

const cartController = {
  addToCart,
  getAllCartItems,
  deleteCartItem,
};

export default cartController;
