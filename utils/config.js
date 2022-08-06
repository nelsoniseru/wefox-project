const Error = require("./error-handler")
const cors = require('cors');
const express = require("express")
const session = require("express-session")
const constant = require("./constant")


class AppConfig {
  constructor(app) {
    this.app = app;
  }

  includeConfig() {
    this.loadAppLevelConfig();
  }
  includeErrorConfig() {
    this.loadAppLevelErrorConfig();
  }

  loadAppLevelErrorConfig() {
    this.app.use(async (req, res, next) => {
     
      const error = new Error(constant.SERVER_NOT_FOUND_HTTP_CODE, req.path + " " + constant.NOT_FOUND)
      next(error)
    })
    this.app.use((err, req, res, next) => {
      res.status(err.statusCode || 500)
      res.json({ status: err.statusCode || 500, message: err.message })
    })
  }

  loadAppLevelConfig() {

    this.app.use(
      express.json(),
    );
    this.app.use(
      cors(),
    );

    this.app.use(session({
      secret: constant.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false, // if true only transmit cookie over https
        httpOnly: true, // if true prevent client side JS from reading the cookie
        maxAge: 1000 * 60 * 10, // session max age in miliseconds

      }

    }))


  }


}
module.exports = AppConfig;
