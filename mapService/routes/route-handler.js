const Error = require("../../utils/error-handler")
const constant = require("../../utils/constant")
const getDetails = require("../../utils/getdetails")
const AddressDetails = require("../mapModel/userAddress")
class MapRouteHandler {
  async postUserAddress(request, response,next) {
    try{
        const {address} = request.body
        if(!address) return response.status(constant.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json(new Error(constant.SERVER_BAD_REQUEST_ERROR_HTTP_CODE,constant.ADDRESS_EMPTY_ERROR))
     let result = await getDetails.getUserAddressDetails(address)  
     if(result.features.length < 1) return response.status(constant.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json(new Error(constant.SERVER_BAD_REQUEST_ERROR_HTTP_CODE,constant.NO_ADDRESS_ERROR))
     if(result.features.length > 1) return response.json({message:"select one of the streets",result:result.features})
    var addressResult = result.features[0].properties
    
   let savedAddress = await AddressDetails.create({
        street:addressResult.display_name,
        streetNumber:addressResult.address.house_number,
        town:addressResult.address.county,
        postalCode:addressResult.address.postcode,
        country:addressResult.address.country
    })
    return response.json({message:"address saved successfully",savedAddress})  
    }catch(error){
      console.log()
   next(new Error(constant.SERVER_BAD_REQUEST_ERROR_HTTP_CODE,constant.ERORR_MESSAGE))
 }
 
}
    async postWeather(request, response,next) {
       try {
        const {address} = request.body
        if(!address) return response.status(constant.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json(new Error(constant.SERVER_BAD_REQUEST_ERROR_HTTP_CODE,constant.ADDRESS_EMPTY_ERROR))
         let result = await getDetails.getUserAddressDetails(address)  
         if(result.features.length < 1) return response.status(constant.SERVER_BAD_REQUEST_ERROR_HTTP_CODE).json(new Error(constant.SERVER_BAD_REQUEST_ERROR_HTTP_CODE,constant.NO_ADDRESS_ERROR))
         if(result.features.length > 1) return response.json({message:"select one of the streets",result:result.features})
        let cord = result.features[0].geometry.coordinates
        let weatherDetails = await getDetails.getWeather(cord[0],cord[1])  
         return response.json({message:"The weather details",result:weatherDetails})      
       } catch (error) {
       
        next(new Error(constant.SERVER_BAD_REQUEST_ERROR_HTTP_CODE,constant.ERORR_MESSAGE))
       }     
    }
  }

  
module.exports = new  MapRouteHandler();
