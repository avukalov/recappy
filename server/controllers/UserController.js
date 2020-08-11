const UserService = require('../services/UserService');

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
}

module.exports = UserController;
