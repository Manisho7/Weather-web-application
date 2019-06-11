const request = require('request')

const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoibWFuaXNobzciLCJhIjoiY2p3YzQ1bGVvMHBhcjN5bW81MzI0ZzZuaiJ9.AgagaWiM9U5Mbd8OPuPcGA'
        
    request({url,json:true},(error,response) => {
        if(error){
           callback('Internet connection failure',undefined)
        }
        else if (response.body.features.length === 0) {
           callback('Unable to find your search',undefined)
        }
        else{
            callback(undefined,{
                lattitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            })
        }
    })
    }
    

    module.exports = geocode
    