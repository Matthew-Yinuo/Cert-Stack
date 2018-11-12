const routes = require("next-routes")();
export default routes
  .add({ name: "home", pattern: "/", page: "index" })
  .add("login")
  .add("me")
  .add("register")
  .add({ name: "createGroup", page: "group/create" })
  .add({ name: "groups", page: "group/find" })
  .add({
    name: "group",
    pattern: "/group/:_id",
    page: "/group/view"
  })
  .add({ name: "createCredential", page: "credential/create" });
export const Router = routes.Router;
export const Link = routes.Link;
