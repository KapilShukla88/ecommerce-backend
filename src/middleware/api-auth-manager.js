import jwt from "jsonwebtoken";
import UserModel from "../models/user-model.js";

/**
 *
 * @param {*} req {authorization} the access token of logged in user
 * @param {*} res {statusCode, message} - only when authorization is not successful
 * @param {*} next  if user pass the authenticated process then only it will move to the next request
 * @description checking the user authorization based on the user access token if user failed the authorization process then it will throw authentication required with the status of 401
 */
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

/**
 *
 * @param  {...any} roles [admin, user]
 * @description to check the user roles
 * @returns `{statusCode, message}`
 */
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
