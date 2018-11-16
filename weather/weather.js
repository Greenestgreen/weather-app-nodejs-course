const request = require('request');

var getWeather = (latitude,longitude,callback) => {

  request({
    url: `https://api.darksky.net/forecast/{{apiKey}}/${latitude},${longitude}?units=si` ,
    json: true,
  }, (error,response,body) => {
    if (error) {
      callback('Unable to connect Forecast.io servers');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather');
    } else if (response.statusCode === 200)  {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      })
    }
  });

};

module.exports = {
  getWeather
};
