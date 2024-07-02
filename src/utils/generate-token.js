import jwt from "jsonwebtoken";
import UserTokenModel from "../models/user-token-model.js";

const generateToken = async (user) => {
  try {
    const payload = { _id: user._id, email: user.email, role: user.role };

    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "14m" }
    );
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_PRIVATE_KEY,
      { expiresIn: "30d" }
    );

    const userToken = await UserTokenModel.findOne({ userId: user._id });
    if (userToken) await UserTokenModel.deleteOne({ userId: user._id });

    await UserTokenModel({ userId: user._id, token: refreshToken }).save();
    return Promise.resolve({ accessToken, refreshToken });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default generateToken;
