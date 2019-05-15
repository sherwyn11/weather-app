const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'https://api.darksky.net/forecast/d5566b1f0d4e8b8a7f85f78a02b9bd9f/' + latitude + ',' + longitude + '?units=si'
    request({url, json: true},(error,{body})=>{
        if(error){
            callback('Network unavailable',undefined)
        }
        else if(body.error){
            callback("Unable to find location",undefined)
        }
        else{
            callback(undefined,{
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                Rainprobability: body.currently.precipProbability
            })
        }   
    })
}

module.exports = forecast






