const UserService = require('../services/UserService');
const RecipeService = require('../services/RecipeService');

class UserController {
  static async getUserByToken(req, res) {
    try {
      const user = await UserService.getUserByToken(req.user.id);
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  static async register(req, res) {
    const newUser = req.body;

    try {
      let user = await UserService.getUserByEmail(newUser.email);

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exists' }] });
      }

      user = await UserService.createUser(newUser);
      let token = user.generateJwt(false);

      return res.status(201).json({ token });
    } catch (error) {
      console.log(error);
      return res.status(500).send('Server error');
    }
  }

  static async login(req, res) {
    const { email, password, remember } = req.body;

    try {
      const user = await UserService.getUserByEmail(email);

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const isMatch = await user.validPassword(password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const token = user.generateJwt(remember);

      return res.status(200).json({ token });
    } catch (error) {
      console.log(error.message, '\n', error);
      return res.status(500).send('Server error');
    }
  }

  // update favorites
  static async favorites(req, res) {
    let recipes = req.body.favorites;
    let user_id = req.body.userID;

    try {
      const user = await UserService.changeFavorite(recipes, user_id);
      return res.json(user.favorites).status(200);
    } catch(err) {
      console.log(err);
      return res.status(500).send('Server error');
    }
  }

  // get favorites
  static async getFavorites(req, res) {
    try {
      const user = await UserService.getUserByToken(req.params.id);
      return res.json(user.favorites).status(200);
    } catch(err) {
      console.log(err);
      return res.status(500).send('Server error');
    }
  }

}

module.exports = UserController;
