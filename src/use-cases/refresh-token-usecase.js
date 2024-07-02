import jwt from "jsonwebtoken";

const generateAccessToken = async (payload) => {
  try {
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_PRIVATE_KEY,
      { expiresIn: "14m" }
    );

    return Promise.resolve(accessToken);
  } catch (error) {
    return Promise.reject("Something went wrong.");
  }
};

const findRefreshToken = async (UserToken, refreshToken) => {
  try {
    const response = await UserToken.findOne({ token: refreshToken });
    if (response) {
      return Promise.resolve(response);
    }
    return Promise.reject({ message: "Invalid refresh token" });
  } catch (error) {
    return Promise.reject({ message: "Invalid refresh token" });
  }
};

export default {
  generateAccessToken,
  findRefreshToken,
};
