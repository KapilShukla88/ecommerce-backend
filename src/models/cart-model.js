import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cart_items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },

      quantity: {
        type: Number,
        default: 0,
      },
      created_at: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  total_count: {
    type: Number,
    default: 0,
  },
});

export const cartSchemaFields = Object.keys(cartSchema.paths);

const CartModel = mongoose.model("Cart", cartSchema);

export default CartModel;
