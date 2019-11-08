var Redis = require("ioredis");
var redis = new Redis();
//Incase any error pops up, log it
redis.on("error", function(err) {
  console.log("Error " + err);
})
module.exports = redis;