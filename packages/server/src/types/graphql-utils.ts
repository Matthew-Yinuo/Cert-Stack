import * as express from "express";
import { Redis } from "ioredis";

export interface ISession extends Express.Session {
  userId?: string;
}

export interface IContext {
  req: express.Request;
  res: express.Response;
  session: ISession;
  redis: Redis;
  serverURL: string;
}

export type Resolver = (
  parent: any,
  args: any,
  context: IContext,
  info: any
) => any;

export interface IResolver {
  [key: string]: {
    [key: string]: Resolver | { [key: string]: Resolver };
  };
}

export interface ISendEmailInput {
  recipient: string;
  subject: string;
  html: string;
}
