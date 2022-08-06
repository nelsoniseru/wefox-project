let fetch = require("node-fetch")
module.exports.getUserAddressDetails = async(address) => {
    const request = await fetch(`https://nominatim.openstreetmap.org/search?addressdetails=1&q=${address}&format=geojson`)
    const data = await request.json()
    return data
}


module.exports.getWeather = async(lon,lat) => {
    const request = await fetch(`http://www.7timer.info/bin/api.pl?lon=${lon}&lat=${lat}&product=astro&output=json`)
    const data = await request.json()
    return data
}