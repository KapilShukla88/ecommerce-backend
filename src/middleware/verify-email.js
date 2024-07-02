import UserRepository from "../repositories/user-repostory.js";
import userUseCase from "../use-cases/user-usecase.js";

export const verifyEmail = async (req, res, next) => {
  try {
    console.log("call...");
    const email = req.body.email;
    const userRepository = new UserRepository();
    const userResponse = await userUseCase.findEmail(email, { userRepository });

    if (userResponse) {
      res.status(409).send({
        statusCode: 409,
        message: "User already exist with this email.",
      });
      return;
    }
    next();
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: "Server error" });
  }
};

export const verifyLoginEmail = async (req, res, next) => {
  try {
    const email = req.body.email;
    const userRepository = new UserRepository();
    const userResponse = await userUseCase.findEmail(email, { userRepository });

    if (!userResponse) {
      res.status(404).send({
        statusCode: 404,
        message: "Email does not exist.",
      });
      return;
    }
    next();
  } catch (error) {
    res.status(500).send({ statusCode: 500, message: "Server error" });
  }
};
