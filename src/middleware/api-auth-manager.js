import jwt from "jsonwebtoken";
import UserModel from "../models/user-model.js";

const auth = async (req, res, next) => {
  try {
    const accessToken = req.headers["authorization"]?.replace("Bearer ", "");
    if (!accessToken || accessToken === "")
      return res.status(401).json({ message: "Auth access token is missing." });

    const validateJWT = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    const user = await UserModel.findOne({ _id: validateJWT?._id });
    req.user = user;

    next();
  } catch (error) {
    res.status(401).json({
      statusCode: error?.statusCode || 401,
      message: "Authentication required.",
    });
  }
};

const authorizerRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        statusCode: 403,
        message: "You do not have permission to create products.",
      });
    }
    next();
  };
};

const apiAuthManager = {
  auth,
  authorizerRoles,
};

export default apiAuthManager;
