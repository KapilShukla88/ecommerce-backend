import UserRepository from "../repositories/user-repostory.js";
import userUseCase from "../use-cases/user-usecase.js";
import generateToken from "../utils/generate-token.js";

/**
 * @description function use to register the user with the encrypted password
 * @param {*} req.body.email user email
 * @param {*} res.body.firstName user first name
 * @param {*} req.body.password user password
 * @returns `{statusCode, message}`
 */
const register = async (req, res) => {
  try {
    const body = req.body;

    const userRepository = new UserRepository();

    const userResponse = await userUseCase.findEmail(body.email, {
      userRepository,
    });
    if (userResponse) {
      res.status(409).send({
        statusCode: 409,
        message: "Email is already against this user.",
      });
      return;
    }

    await userUseCase.saveNewUser(req.body, {
      userRepository,
    });

    res
      .status(201)
      .send({ success: true, message: "Account created successfully." });
  } catch (error) {
    console.log("error =>>", error);
    res.status(500).json({ statusCode: 500, message: "Internal Server Error" });
  }
};

/**
 *
 * @param {*} req {email, password}
 * @returns `{success, data: {accessToken, refreshToken, first_name, last_name, email, avatar, role}, message}`
 */
const login = async (req, res) => {
  try {
    const userRepository = new UserRepository();
    const userResponse = await userUseCase.findEmail(req.body.email, {
      userRepository,
    });

    if (!userResponse) {
      return res
        .status(400)
        .send({ statusCode: 404, message: "Invalid email or password" });
    }
    const verifyPassword = await userUseCase.comparePassword(
      req.body.password,
      userResponse.password
    );

    if (!verifyPassword) {
      return res
        .status(401)
        .send({ statusCode: 401, message: "Invalid email or password." });
    }
    const { first_name, last_name, email, avatar, role } = userResponse;
    const { accessToken, refreshToken } = await generateToken(userResponse);

    res.status(201).send({
      success: true,
      data: {
        accessToken,
        refreshToken,
        first_name,
        last_name,
        email,
        avatar,
        role,
      },
      message: "Logged in successfully.",
    });
  } catch (error) {
    res.status(500).send(error);
  }
};

const authController = {
  register,
  login,
};

export default authController;
