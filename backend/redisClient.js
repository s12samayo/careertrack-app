const redis = require("redis");

const redisClient = redis.createClient({
  url: `redis://${process.env.REDIS_HOST || "redis"}:${
    process.env.REDIS_PORT || 6379
  }`,
});

redisClient.on("error", (error) => {
  console.error("Redis error:", error);
});

module.exports = redisClient;
