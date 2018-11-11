import * as express from "express";
import * as session from "express-session";

import * as connectRedis from "connect-redis";

import { redisSessionPrefix } from "../constant";
import { redis } from "../redis";
import { confirmEmail } from "../routes/confirmEmail";

const RedisStore = connectRedis(session as any);

const createApplication = (): express.Application => {
  const app = express();

  app.use(
    session({
      store: new RedisStore({
        client: redis as any,
        prefix: redisSessionPrefix
      }),
      name: "qid",
      secret: "asdjlfkaasdfkjlads",
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
      }
    })
  );

  app.get("/confirm/:id", confirmEmail);

  return app;
};

export { createApplication };
