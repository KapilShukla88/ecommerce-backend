import UserModel from "../models/user-model.js";
import MasterRepository from "./master-repository.js";

class UserRepository extends MasterRepository {
  constructor() {
    super(UserModel);
    this.model = UserModel;
  }
}

export default UserRepository;
