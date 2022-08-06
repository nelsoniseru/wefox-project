/* eslint-disable no-console */
const express = require('express');
const http = require('http');
const config = require('./databaseService/config.js/db');
const LoginRoutes = require("./usersService/routes/routes")
const MapRoutes = require("./mapService/routes/routes")
const AppConfig = require('./utils/config');
 require('./utils/error-handler');
 require("dotenv").config()
class Server {
  constructor() {
    this.app = express();
    this.http = http.Server(this.app);
     
  }
 // mongodb://127.0.0.1:27017/wefox
  appConfig() {
    new AppConfig(this.app).includeConfig();
  }
  errorConfig() {
    new AppConfig(this.app).includeErrorConfig();
  }

  /* Including app Routes starts */
  includeRoutes() {
    new LoginRoutes(this.app).routesConfig();
    new MapRoutes(this.app).routesConfig()
  }
  connectDatabase() {
      config.mongodb
   }
  /* Including app Routes ends */

  startTheServer() {
    this.appConfig();
    this.includeRoutes();
    this.connectDatabase()
    this.errorConfig()
    const port = process.env.NODE_SERVER_POST || 4000;

    this.http.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  }
}


module.exports = new Server();
