const redis = require('redis');
const bluebird = require('bluebird');
bluebird.promisifyAll(redis.RedisClient.prototype);

const config = require('config');
const redisURI = config.get('ConnectionStrings.redisURI');

const client = redis.createClient(redisURI);

client.on('ready', () => {
  console.error('Redis connected...');
});

client.on('error', (error) => {
  console.error(error);
});

module.exports = client;
