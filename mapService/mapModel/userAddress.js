const mongoose = require("mongoose")
const userAddress = new mongoose.Schema({
    street:String,
    streetNumber:Number,
    town:String,
    postalCode:String, 
    country:String 
})

let User_address_details = mongoose.model("User_address_details",userAddress)
module.exports = User_address_details