var redis = require("redis");
const configure = require('./configure')

const config = configure()
var db = redis.createClient({
  host: config.redis.host,
  port: config.redis.port,
  retry_strategy: () => {
    return new Error("Retry time exhausted")
  }
})
db.on("error", (err) => {
  console.error(err)
})
db.on('connect', function() {
  console.log('Connected!');
});
process.on('SIGINT', function() {
  db.quit();
});

module.exports = db
