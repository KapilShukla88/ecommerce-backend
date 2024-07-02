"use strict";
import ProductModel from "../models/product-model.js";
import MasterRepository from "./master-repository.js";

class ProductRepository extends MasterRepository {
  constructor() {
    super(ProductModel);
    this.model = ProductModel;
  }
}

export default ProductRepository;
