import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: [true, "Please enter your first name."],
    maxLength: [30, "The first name cannot exceed 30 characters."],
    minLength: [4, "The first name must have more than four characters."],
  },
  last_name: {
    type: String,
    maxLength: [30, "The last name cannot exceed 30 characters."],
    minLength: [4, "the last name must have more than four characters."],
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please enter your password."],
    minLength: [8, "The password must be longer than eight characters."],
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

//using this mongoose virtual combine the first name and last name to userName, it will combine both first and last name
userSchema.virtual("userName").get(function () {
  return this.first_name + " " + this.last_name;
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
