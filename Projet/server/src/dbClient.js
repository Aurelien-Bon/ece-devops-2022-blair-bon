var redis = require("redis");
const configure = require('./configure')

const config = configure()
const db = redis.createClient({
  host: process.env.REDIS_HOST || config.redis.host,
  port: process.env.REDIS_PORT || config.redis.port,
  retry_strategy: () => {
    return new Error("Retry time exhausted")
  }
})


process.on('SIGINT', function() {
  db.quit();
});

module.exports = db
