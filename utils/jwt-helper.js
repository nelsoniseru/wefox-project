const constant = require("../utils/constant")
const jwt = require("jsonwebtoken") 
const Error = require("./error-handler")

module.exports.signAccessToken=async(userId)=>{
    console.log(userId)
    const secret = constant.JWT_SECRET
    const payload = {}
    const options={
        expiresIn: constant.JWT_EXPIRES_IN,
        audience:userId
    }
 let token = await jwt.sign(payload,secret,options)
 return token
}


module.exports.authorized=async(req,res,next)=>{
    if(!req.headers['authorization']) return res.status(constant.SERVER_UNATHORIZE_HTTP_CODE).json(new Error(constant.SERVER_UNATHORIZE_HTTP_CODE,constant.UNATHORIZE_MESSAGE))
    const header = req.headers['authorization']
    const bearerToken = header.split(' ')
    const token = bearerToken[1]
    const secret = constant.JWT_SECRET
    jwt.verify(token,secret,(err,payload)=>{

        if(err){
            const MESSAGE = err.name ==="JsonWebTokenError"? 'unauthorized':err.message
            return res.status(constant.SERVER_UNATHORIZE_HTTP_CODE).json(new Error(constant.SERVER_UNATHORIZE_HTTP_CODE,MESSAGE))
        }
        
        req.payload = payload
        next()
    })
   
}