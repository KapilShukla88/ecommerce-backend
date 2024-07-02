import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: { type: Date, default: Date.now, expires: 30 * 86400 }, // 30 days
});

const UserTokenModel = mongoose.model("UserToken", userSchema);

export default UserTokenModel;
