const yargs = require('yargs');
const axios = require('axios');


const argv = yargs
  .options({
    a:{
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }

  }).
  help()
  .alias('help','h')
  .argv;

var encodedAddress = encodeURIComponent(argv.address);
var geocodeUrl = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + encodedAddress + '&key=AIzaSyDtm5LeTVbG3rhMurRviY-kemB_8ZeO_v8';

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw  new Error('Unable to find that address');
  }
  var latitude = response.data.results[0].geometry.location.lat;
  var longitude = response.data.results[0].geometry.location.lng;
  var weatherUlr =  `https://api.darksky.net/forecast/f561af50ada7a858c5febbf932cc08a2/${latitude},${longitude}?units=si`

  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUlr);
}).then((response) => {
  var temperature = response.data.currently.temperature;
  var apparentTemperature = response.data.currently.apparentTemperature;
  console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((e) => {
  if (e.code === 'ENOTFOUND') {
    console.log('Unable to connect API servers');
  } else {
    console.log(e.message);
  }
});
