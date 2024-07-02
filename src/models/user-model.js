import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please enter your first name."],
    maxLength: [30, "First name cannot be exceed 30 characters."],
    minLength: [4, "First name should have more than 4 characters."],
  },
  last_name: {
    type: String,
    maxLength: [30, "Last name cannot be exceed 30 characters."],
    minLength: [4, "Last name should have more than 4 characters."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password."],
    minLength: [8, "Password should be greater than 8 characters"],
    select: true,
  },
  avatar: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
