import * as express from "express";
import * as session from "express-session";

import * as Redis from "ioredis";
import * as connectRedis from "connect-redis";
import { redisSessionPrefix } from "../constants";
const RedisStore = connectRedis(session as any);
const redis = (() => {
  const r =
    process.env.NODE_ENV === "production"
      ? new Redis("redis://redis_server:6379")
      : new Redis();
  r.on("connect", () => console.log("Redis is connected."));
  r.on("error", () => console.log("Redis connection unsuccessful."));
  return r;
})();

const createApplication = (): express.Application => {
  const app = express();
  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix
      }),
      name: "qid",
      secret: "asqetbbnqqqhuysf",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );
  return app;
};
export { createApplication };
