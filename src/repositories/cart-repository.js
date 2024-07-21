"use strict";
import CartModel from "../models/cart-model.js";
import MasterRepository from "./master-repository.js";

class CartRepository extends MasterRepository {
  constructor() {
    super(CartModel);
    this.model = CartModel;
  }

  populate = async (userId, populateCollectionName) => {
    const response = await this.model.findOne({ user_id: userId }).populate({
      path: "cart_items.product",
      model: populateCollectionName,
    });

    return response;
  };

  deleteOne = async (userId) => {
    const response = await this.model.deleteOne({ user_id: userId });

    return response;
  };
}

export default CartRepository;
