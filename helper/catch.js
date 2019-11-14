const Redis = require("ioredis");
const { logger } = require("./logger");
const redis = new Redis({
  host: "redis-server",
  port: 6379
});
//Incase any error pops up, log it
redis.on("error", function() {
  logger.error("Connect to redis error");
});
module.exports = redis;
