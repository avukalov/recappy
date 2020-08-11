const mongoose = require('mongoose');
const User = mongoose.model('User');

class UserService {
  static async createUser({ firstName, lastName, email, password }) {
    let user = new User({
      firstName,
      lastName,
      email,
    });

    await user.setGravatar(email);
    await user.setPassword(password);

    await user.save();

    return user;
  }

  static async getUserByToken(id) {
    return await User.findById(id).select('-password');
  }

  static async getUserByEmail(email) {
    return await User.findOne({ email });
  }
}

module.exports = UserService;
