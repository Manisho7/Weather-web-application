const request = require('request')

const forecast = (lattitude,longitude,location,callback) => {
const url = 'https://api.darksky.net/forecast/cbc1ea4c1ab5a8a1a6bca6189dfa3db9/'+ longitude +','+lattitude+'?units=si&exclude=hourly'
request({url: url, json:true}, (error,response) => {
   if(error){
     callback('Internet connection problem',undefined)
   }
   else if(response.body.error){
        callback('parameters missing or incorrect',undefined)
   }
   else{
         callback(undefined,response.body.daily.summary + 'Temperature is '+response.body.currently.temperature)
   }
})

}

module.exports = forecast