import { Router } from "../routes/index";
import { NextContext } from "next";

export default (context: NextContext, target: string) => {
  if (context.res && context.req) {
    const { res, req } = context;
    // FIXME
    const redirectURL =
      (req as any).protocol + "://" + (req as any).get("host") + target;
    res.writeHead(303, { Location: redirectURL });
    res.end();
  } else {
    // In the browser, we just pretend like this never even happened ;)
    Router.pushRoute(target);
  }
};
