const redis = require("redis");

const redisClient = redis.createClient({
  socket: {
    host: "redis",
    port: 6379,
  },
});

redisClient.on("connect", () => {
  console.log("Connected to Redis");
});

redisClient.on("error", (error) => {
  console.error("Redis error:", error);
});

module.exports = redisClient;
