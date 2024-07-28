import jwt from "jsonwebtoken";

/**
 * @description to generate the access token
 * @param {*} payload {_id, role}
 * @returns `accesstoken`
 */
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

/**
 * @description to find the refresh token
 * @param {*} UserToken User mongodb model
 * @param {*} refreshToken user active refreshToken
 * @returns `{}`
 */
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
