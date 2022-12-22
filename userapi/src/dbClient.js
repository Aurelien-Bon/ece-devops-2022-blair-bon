var redis = require("redis");
const configure = require('./configure')

const config = configure()
console.log("host env: "+process.env.REDIS_HOST)
console.log("port env: "+process.env.REDIS_PORT)
console.log("host config: "+config.redis.host)
console.log("port config: "+config.redis.port)
const db = redis.createClient({
  host: process.env.REDIS_HOST || config.redis.host,
  port: process.env.REDIS_PORT || config.redis.port,
  retry_strategy: () => {
    return new Error("Retry time exhausted")
  }})
db.on("error", function (err) {
  console.log("Error " + err);
});



process.on('SIGINT', function() {
  db.quit();
});

module.exports = db
