export interface ISession extends Express.Session {
  userId?: string;
}

export interface IContext {
  req: Express.Request;
  session: ISession;
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
