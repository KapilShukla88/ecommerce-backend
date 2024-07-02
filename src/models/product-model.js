import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter product name."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description."],
  },
  category: {
    type: String,
    required: [true, "Please enter product category."],
  },
  brand: {
    type: String,
    required: [true, "Please enter brand name."],
  },
  price: {
    type: Number,
    require: [true, "Please enter product price"],
    maxLength: [8, "Price cannot be exceed 8 characters."],
    default: 0,
  },
  currency: {
    type: String,
    default: "IN",
  },
  stock: {
    type: Number,
    required: [true, "Please enter product stock"],
    maxLength: [4, "Please cannot exceed 4 character."],
    default: 1,
  },
  product_ratings: {
    type: Number,
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  images: [
    {
      url: {
        type: String,
      },
      alt_text: {
        type: String,
      },
    },
  ],
  reviews: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      title: {
        type: String,
        maxLength: 35,
        required: true,
      },
      comment: {
        type: String,
        maxLength: 110,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  is_deleted: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

export const productSchemaFields = Object.keys(productSchema.paths);

const ProductModel = mongoose.model("products", productSchema);

export default ProductModel;
