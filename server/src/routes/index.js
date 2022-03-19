const AuthRoute = require("./auth.routes");
function route(app) {
  app.use("/auth", AuthRoute);
}
module.exports = route;
