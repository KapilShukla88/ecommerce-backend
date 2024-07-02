import bcrypt from "bcrypt";

const findEmail = async (email, { userRepository }) => {
  const dbResponse = await userRepository.findOne({ email: email });
  return dbResponse;
};

const foundUser = async (_id, { userRepository }) => {
  const response = await userRepository.findOne({ _id: _id });
  return response;
};

const saveNewUser = async (
  { firstName, lastName, email, password, img, role },
  { userRepository }
) => {
  let bodyOptions = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    avatar: img,
    role: role,
  };

  const salt = await bcrypt.genSalt(Number.parseInt(process.env.SALT));
  const hashPassword = await bcrypt.hash(password, salt);

  if (hashPassword) {
    bodyOptions.password = hashPassword;
  }
  const dbResponse = await userRepository.save(bodyOptions);

  return dbResponse;
};

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
