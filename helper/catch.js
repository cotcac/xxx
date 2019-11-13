const Redis = require("ioredis");
const redis = new Redis({
  host: 'redis-server',
  port: 6379
});
//Incase any error pops up, log it
redis.on("error", function(err) {
  console.log("Error " + err);
})
module.exports = redis;
