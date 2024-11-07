// const request = require('postman-request')
const request = require('request')

const geocode = (address, callback) => {
    // encodeURIComponent(address): filter every special & unwanted characters
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q='+ encodeURIComponent(address) +'&access_token=pk.eyJ1IjoiZGFuYWxkIiwiYSI6ImNsdGcwZGlmbTBzbzIycHBicW1ncGZsZmwifQ.v3gB1Awbq8yqhE7JjoiCyg&limit=1'

    request({url: url, json: true}, (error, response, {features}={}) => {
        // console.log(body.features)
        if(error){
            callback('Unable to connect to the internet..', undefined)
        // }else if(body.features.length == 0){
        }else if(response.body.features.length == 0){
            callback("Sorry, could not find a location, make sure to enter a valid location..", undefined)
        }else{
            callback(undefined, {
                longitude: features[0].properties.coordinates.longitude,
                latitude: features[0].properties.coordinates.latitude,
                location: features[0].properties.name+' '+features[0].properties.place_formatted
            })
        }
    })
}

module.exports = geocode