const mongooseClient = require("mongoose")
require('dotenv').config()
class MongoDB {
    constructor() {
        this.mongoClient = mongooseClient
      }
  onConnect() {
      this.mongoClient.connect(
        process.env.MONGODB_DB_URL, {
          useNewUrlParser: true,
        },
        (err, client) => {
          if (err) {
            console.log(err);
          } else {
            console.log("database connected")
          }
        },
      );

  }
}
module.exports.config = {mongodb:new MongoDB().onConnect()}
