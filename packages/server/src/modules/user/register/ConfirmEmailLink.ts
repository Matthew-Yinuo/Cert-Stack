import { v4 } from "uuid";
import { Redis } from "ioredis";
// http://localhost:4000
// https://my-site.com
// => https://my-site.com/confirm/<id>
interface IConfirmEmailLinkInput {
  serverURL: string;
  userId: string;
  redis: Redis;
}
export const createConfirmEmailLink = async ({
  serverURL,
  userId,
  redis
}: IConfirmEmailLinkInput): Promise<string> => {
  const id = v4();
  await redis.set(id, userId, "ex", 60 * 60 * 24);
  return `${serverURL}/confirm/${id}`;
};
