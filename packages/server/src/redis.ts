import * as Redis from "ioredis";
const redis = (() => {
  const r =
    process.env.NODE_ENV === "production"
      ? new Redis("redis://redis_server:6379")
      : new Redis();
  r.on("connect", () => console.log("Redis is connected."));
  r.on("error", () => console.log("Redis connection unsuccessful."));
  return r;
})();
export { redis };
