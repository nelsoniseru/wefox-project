let fetch = require("node-fetch")
const constant = require("../utils/constant")

module.exports.getAccessToken=async(code)=>{
    const res = await fetch(constant.ACCESS_TOKEN_URL,{
     method:"POST",
     headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        client_id:constant.GITHUB_CLIENT_ID,
        client_secret:constant.GITHUB_CLIENT_SECRET,
        code
      })
     })
     const data = await res.text()
     const params = new URLSearchParams(data)
 
     return params.get("access_token")
    }




module.exports.githubUser=async(access_token)=>{
  
        const request = await fetch(constant.GITHUB_USER_URL,{
          headers:{
            Authorization:`bearer ${access_token}`
          }
        })
        const data = await request.json()
      return data
     
      }




