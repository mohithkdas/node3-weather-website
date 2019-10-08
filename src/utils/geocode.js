const request = require('request')


const geocode = (address, callback) => {

    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURI(address) + '.json?access_token=pk.eyJ1IjoibW9oaXRoa2RhcyIsImEiOiJjazE3bThsamcwMGJiM210Y3J2emdwOGdxIn0.ji9ZQkWvvkncrmar-9Jqag&limit=1'
    request({ url, json: true }, (error,/*response*/ {body}) => {
        if (error) { callback("Unable to Connect to Location Service", undefined) }
        else if (/*response.*/body.features.length == 0) { callback("Unable to Find location", undefined) }
        else {
            callback(undefined, {
                longitude: /*response.*/body.features[0].center[0],
                latitude: /*response.*/body.features[0].center[1],
                location: /*response.*/body.features[0].place_name
            })
        }
    })

}

module.exports = geocode