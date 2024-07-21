import OrderRepository from "../repositories/order-repository.js";
import CartRepository from "../repositories/cart-repository.js";
import {
  addNewOrderUseCase,
  getMyAllOrdersUseCase,
} from "../use-cases/order-usecase.js";

const addNewOrderController = async (req, res) => {
  try {
    const orderRepository = new OrderRepository();
    const cartRepository = new CartRepository();
    const response = await addNewOrderUseCase(
      { user: req.user?._id, paidAt: Date.now(), ...req.body },
      { orderRepository }
    );

    if (response) {
      await cartRepository.deleteOne(req.user._id);
    }

    res.status(200).json(response);
  } catch (error) {
    console.log("error =>>", error);
    res.status(500).send({
      statusCode: 500,
      message: "Something went wrong.Unable to delete the product.",
    });
  }
};

const getMyAllOrders = async (req, res) => {
  try {
    const orderRepository = new OrderRepository();
    const orders = await getMyAllOrdersUseCase(req.user._id, {
      orderRepository,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).send({
      statusCode: 500,
      message: "Something went wrong.Unable to delete the product.",
    });
  }
};

export { addNewOrderController, getMyAllOrders };
