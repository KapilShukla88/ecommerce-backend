import bcrypt from "bcrypt";
import { putAWSObject } from "../services/aws-service.js";
import { AWS_CDN_URL } from "../resources/constants.js";

/**
 * @description to find the user by using user email
 * @param {*} email user email
 * @param {*} userRepository user model service
 * @returns `{...}`
 */
const findEmail = async (email, { userRepository }) => {
  const dbResponse = await userRepository.findOne({ email: email });
  return dbResponse;
};

/**
 * @description to find the user by using the user id
 * @param {*} _id user id
 * @param {*} userRepository user model service
 * @returns `{.....}`
 */
const foundUser = async (_id, { userRepository }) => {
  const response = await userRepository.findOne({ _id: _id });
  return response;
};

/**
 * @description to save the new user
 * @param {firstName, lastName, email, password, img, role}
 * @param {*} userRepository user model service
 * @returns `{......}`
 */
const saveNewUser = async (
  { firstName, lastName, email, password, img, role },
  { userRepository }
) => {
  let bodyOptions = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    role: role,
  };

  if (img) {
    const image = JSON.parse(img);

    if (image?.avatar) {
      const buffer = Buffer.from(
        image?.avatar?.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      );
      const awsObject = {
        fileName: firstName + "/" + `image-${Date.now()}-` + image?.name,
        contentType: image?.type || "",
        imageSize: image?.size || 0,
        body: buffer,
      };

      await putAWSObject(
        awsObject.fileName,
        awsObject.body,
        awsObject.contentType,
        awsObject.imageSize
      );

      bodyOptions.avatar = AWS_CDN_URL + awsObject.fileName;
    }
  }

  const salt = await bcrypt.genSalt(Number.parseInt(process.env.SALT));
  const hashPassword = await bcrypt.hash(password, salt);

  if (hashPassword) {
    bodyOptions.password = hashPassword;
  }
  const dbResponse = await userRepository.save(bodyOptions);

  return dbResponse;
};

/**
 * @description use to compare the password
 * @param {*} currentPassword user current entered password
 * @param {*} existingPassword user existing password
 * @returns `{...}`
 */
const comparePassword = async (currentPassword, existingPassword) => {
  const verifiedPassword = await bcrypt.compare(
    currentPassword,
    existingPassword
  );

  return verifiedPassword;
};

const userUseCase = {
  foundUser,
  findEmail,
  saveNewUser,
  comparePassword,
};

export default userUseCase;
