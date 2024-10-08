import UserTokenModel from "../models/user-token-model.js";
import jwt from "jsonwebtoken";

/**
 * 
 * @param {*} refreshToken refresh token of the user
 * @description verify the refresh token using refresh token private key via finding out the refresh token from the db
 * @returns `{tokenDetail, error, message}`
 */
const verifyRefreshToken = (refreshToken) => {
  const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

  return new Promise(async (resolve, reject) => {
    const doc = await UserTokenModel.findOne({ token: refreshToken });
    if (!doc) return reject({ message: "Invalid refresh token", error: true });

    jwt.verify(refreshToken, privateKey, (err, tokenDetail) => {
      if (err) return reject({ message: "Invalid refresh token", error: true });

      resolve({
        tokenDetail,
        error: false,
        message: "Valid refresh token",
      });
    });
  });
};

export default verifyRefreshToken;
