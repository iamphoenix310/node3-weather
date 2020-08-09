const request = require('postman-request')

const forecast = (longitude, latitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=62eb7d7769d1f677e175a7008c9c248b&query=" + latitude + "," + longitude + "&units=f"
   
    request({ url, json: true }, (error, {body}= {}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        }
        else {
            callback(undefined, body.current.weather_descriptions[0] + " througout the day. The humidity is "+ body.current.humidity +" and it is currently " + body.current.temperature + " degrees out and feels like " + body.current.feelslike + " out there!")
        }
    })
    }

module.exports = forecast