"use strict";
import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const mongodbConnectionURL =
  process.env.NODE_ENV === "dev"
    ? process.env.DEV_MONGODB_URL
    : process.env.MONGODB_URL;
mongoose
  .connect(mongodbConnectionURL) //"mongodb://localhost:27017/e-comm"
  .then(() => console.log("Mongodb connected."))
  .catch((err) => {
    console.log("Mongodb connection error:", err);
    process.exit(1);
  });

export const withTransaction = () => {
  return mongoose.startSession();
};

export const mongoDisconnect = async () => {
  await mongoose.disconnect();
  console.log("Mongodb disconnected.");
};
