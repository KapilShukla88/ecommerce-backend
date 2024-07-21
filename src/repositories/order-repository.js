"use strict";
import OrderModel from "../models/order-model.js";
import MasterRepository from "./master-repository.js";

class OrderRepository extends MasterRepository {
  constructor() {
    super(OrderModel);
    this.model = OrderModel;
  }
  findByUserId = async (userId) => {
    const response = await this.model.find({ user: userId }).exec();

    return response;
  };
}

export default OrderRepository;
