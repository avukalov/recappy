const client = require('../config/redis');

class RedisService {
  static async getRecipeByKey(key) {
    return await client.getAsync(key);
  }

  static async setRecipeToCache(key, value) {
    const set = await client.setAsync(key, value);
    const expire = await client.expireAsync(key, 360);

    return { set, expire };
  }

  static async setRecipeToHistory(key, value) {
    let expire;
    let set = await client.saddAsync(key, value);

    if (set === 1) {
      expire = await client.expireAsync(key, 1800);
    }

    return { set, expire };
  }
}

module.exports = RedisService;
