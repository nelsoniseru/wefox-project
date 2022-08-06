const accessGithubToken = require("../../utils/accesstokenHelper")
const Error = require("../../utils/error-handler")
const constant = require("../../utils/constant")
const jwt = require('../../utils/jwt-helper') 
const User = require("../userModel/users")
class LoginRouteHandler {
  async login(request, response) {
    const url = `${constant.GITHUB_AUTH_URL}?client_id=${constant.GITHUB_CLIENT_ID}&redirect_url=localhost:4000/login/github/callback`
    response.redirect(url)
    }
    async loginCallback(request, response) {
        try {
            var jwtToken 
            const code = request.query.code
            const token = await accessGithubToken.getAccessToken(code)
            const userData = await accessGithubToken.githubUser(token)
        
            let existingUser =await User.findOne({email:userData.email})
           
            if(!existingUser){
             var user = await User.create({userID:userData.id,email:userData.email})
              jwtToken = await jwt.signAccessToken(user.email)
              return response.status(constant.SERVER_OK_HTTP_CODE).json({success:true,jwtToken})         

            } 
            jwtToken = await jwt.signAccessToken(existingUser.email)
            console.log(jwtToken)
            request.session.token = jwtToken
            return response.status(constant.SERVER_OK_HTTP_CODE).json({success:true,jwtToken})         
          } catch (error) {
            console.log(error)
          response.status(constant.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json(new Error(constant.SERVER_BAD_REQUEST_ERROR_HTTP_CODE,constant.ERORR_MESSAGE))
        }

    }
  }

  
module.exports = new LoginRouteHandler();
