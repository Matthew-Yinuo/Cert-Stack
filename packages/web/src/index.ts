import * as next from "next";
import * as express from "express";

import routes from "./routes";

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = routes.getRequestHandler(app);

app.prepare().then(() => {
  const server = express();
  server.get("*", (req, res) => handle(req, res));
  server.listen({ port }, () =>
    console.log(`🚀 Client ready at http://localhost:${port}`)
  );
});
