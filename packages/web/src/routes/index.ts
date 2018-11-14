// BUG: https://github.com/fridays/next-routes/pull/153
const routes = require("next-routes")();

export default routes
  .add({ name: "home", pattern: "/", page: "index" })
  .add({ name: "register", page: "user/register" })
  .add({ name: "login", page: "user/login" })
  .add({ name: "me", page: "user/me" })
  .add({ name: "createGroup", page: "group/create" })
  .add({ name: "groups", page: "group/find" })
  .add({
    name: "group",
    pattern: "/group/:_id",
    page: "/group/view"
  })
  .add({ name: "createCredential", page: "credential/create" })
  .add({ name: "credentials", page: "credential/find" });

export const Router = routes.Router;
export const Link = routes.Link;
