const routes = require("next-routes")();
export default routes
  .add({ name: "home", pattern: "/", page: "index" })
  .add("login")
  .add("me")
  .add("register")
  .add({ name: "createGroup", page: "group/create" })
  .add({ name: "createCredential", page: "credential/create" });
export const Router = routes.Router;
