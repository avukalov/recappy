const RedisService = require('../services/RedisService');

class CacheMiddleware {
  static async getRecipeFromCache(req, res, next) {
    const token = req.header('x-auth-token');
    const { id } = req.params;

    console.log(token);

    try {
      const data = await RedisService.getRecipeByKey(id);

      console.log('cache-data', data);

      // no data
      if (!data) {
        return next();
      }

      // data but no token
      if (!token) {
        return res.status(200).json(JSON.parse(data));
      }

      // data and token
      const history = await RedisService.setRecipeToHistory(token, data);

      console.log('history', history);

      return res.status(200).json(JSON.parse(data));
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
}

module.exports = CacheMiddleware;
