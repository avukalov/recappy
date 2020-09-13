const mongoose = require('mongoose');
const User = mongoose.model('User');

const objectId = mongoose.Types.ObjectId;

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

  // change list of favorite recipes

  static async changeFavorite(recipes, user_id) {
    return await User.findOneAndUpdate(
      { _id: objectId(user_id) }, 
      { $set: {
                favorites: recipes
              }
      })
    }

}

module.exports = UserService;
