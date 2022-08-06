const LoginRouteHandler = require('./route-handler');

class LoginRoutes {
  constructor(app) {
    this.app = app;
  }

  /* creating app Routes starts */
  appRoutes() {

    this.app.get('/login/github', LoginRouteHandler.login);
    this.app.get('/login/github/callback', LoginRouteHandler.loginCallback)
  }

  routesConfig() {
    this.appRoutes();
  }
}
module.exports = LoginRoutes;
