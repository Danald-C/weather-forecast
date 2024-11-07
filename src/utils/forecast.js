// const request = require('postman-request')
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherapi.com/v1/current.json?key=b2707ef2b69546b4810175632240203&q='+latitude+','+longitude
    // request({url: url, json: true}, (error, response, body) => {
    request({url: url, json: true}, (error, response, {current}={}) => {
        if(error){
            callback("Sorry, no internet connection found..", undefined)
        // }else if(body.error){
        }else if(response.body.error){
            callback("Sorry, found no weather information..", undefined)
        }else{
            let message = current.condition.text
            message += ": The Temperature is "
            message += current.temp_c
            message += " degrees out but feels like "
            message += current.feelslike_c
            message += " degrees out"
            callback(undefined, message)
        }
    })
}

module.exports = forecast