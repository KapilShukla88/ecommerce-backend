import UserTokenModel from "../models/user-token-model.js";
import refreshTokenUsecase from "../use-cases/refresh-token-usecase.js";
import verifyRefreshToken from "../utils/verify-refresh-token.js";

const generateRefreshToken = async (req, res) => {
  try {
    const response = await verifyRefreshToken(req.body.refresh_token);
    if (response) {
      const payload = { _id: response?.tokenDetail?._id, role: response?.tokenDetail?.role };
      const tokenResponse = await refreshTokenUsecase.generateAccessToken(
        payload
      );

      res.status(201).json({
        statusCode: 201,
        refreshToken: tokenResponse,
        message: "Refresh token created successfully.",
      });
    }
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, message: error?.message ?? "Server error" });
  }
};

const deleteRefreshToken = async (req, res) => {
  try {
    const response = await refreshTokenUsecase.findRefreshToken(
      UserTokenModel,
      req.body.refresh_token
    );

    if (response) {
      const isDeleted = await UserTokenModel.deleteOne({
        token: req.body.refresh_token,
      });

      if (isDeleted) {
        res
          .status(200)
          .json({ statusCode: 200, message: "Logged out successfully." });
      } else {
        res
          .status(400)
          .json({ statusCode: 400, message: "Something went wrong." });
      }
    }
    res
      .status(404)
      .json({ statusCode: 404, message: "Invalid refresh token." });
  } catch (error) {
    res
      .status(500)
      .json({ statusCode: 500, message: error?.message ?? "Server error" });
  }
};

export default { generateRefreshToken, deleteRefreshToken };
