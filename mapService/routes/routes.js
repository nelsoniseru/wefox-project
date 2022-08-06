const MapRouteHandler = require('./route-handler');
const auth = require('../../utils/jwt-helper');

class mapRoutes {
  constructor(app) {
    this.app = app;
  }

  /* creating app Routes starts */
  appRoutes() {
    this.app.post('/api/user-address', MapRouteHandler.postUserAddress);
    this.app.post('/api/weather', auth.authorized,MapRouteHandler.postWeather)
    
  }

  routesConfig() {
    this.appRoutes();
  }
}
module.exports = mapRoutes;
