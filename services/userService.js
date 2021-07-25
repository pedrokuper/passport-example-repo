const Users = require("../models/userModel");

class UserService {
  getUserByName(name) {
    const query = Users.findOne({ name }).exec();
    return query;
  }
}

module.exports = UserService;
