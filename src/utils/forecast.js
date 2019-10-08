const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/f6af119d655df35b60a69c251cdba0ce/' + latitude + ',' + longitude + '?units=si&lang=en'
    request({ url, json: true }, (error, /*response*/{body}) => {
        if (error) {
            callback("Unable to connect to Weather Service", undefined)
        } else if (/*response.*/body.error) {
            callback("Unable to Find Weather", undefined)
        } else {
            callback(undefined, /*response.*/body.daily.data[0].summary + " It is currently " + /*response.*/body.currently.temperature + " degrees out. The high today is: "+ body.daily.data[0].temperatureHigh +" with a low of: "+ body.daily.data[0].temperatureLow +". There is a " + /*response.*/body.currently.precipProbability + "% chance of rain. (DarkSky: "+/*response.*/body.timezone+")")
        }
    })
}

module.exports = forecast