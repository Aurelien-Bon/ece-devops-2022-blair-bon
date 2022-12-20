var redis = require("redis");
const configure = require('./configure')

let db = null

const config = configure()
if(process.env.REDIS_CACHEKEY) {
  db = redis.createClient(6380, process.env.REDIS_HOST,
    {auth_pass: process.env.REDIS_CACHEKEY, tls: {servername: process.env.REDIS_HOST},
    retry_strategy: () => {
    return new Error("Retry time exhausted")
  }})
}
else{
  db = redis.createClient({
  host: process.env.REDIS_HOST || config.redis.host,
  port: process.env.REDIS_PORT || config.redis.port,
  retry_strategy: () => {
    return new Error("Retry time exhausted")
  }})
}



process.on('SIGINT', function() {
  db.quit();
});

module.exports = db
