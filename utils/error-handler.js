
class Error {
    constructor(statusCode,message) {
        this.statusCode = statusCode;
        this.message = message;
         
      } 
  
    }
  
  
 //console.log(new Error(400,"not found"))
  
  
  
  module.exports = Error;
  