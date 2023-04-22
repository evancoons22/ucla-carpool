require('dotenv').config({ path: './.env' });
const https = require('https');
console.log(process.env.FLIGHT_AWARE_API);

const options = {
  hostname: 'aeroapi.flightaware.com',
  path: '/aeroapi/airports/KLAX/flights?type=Airline&start=2023-04-23&end=2023-04-24&max_pages=1',
  method: 'GET',
  headers: {
    'Accept': 'application/json; charset=UTF-8',
    'x-apikey': process.env.FLIGHT_AWARE_API
  }
};

const req = https.request(options, res => {
  let data = '';
  console.log(`statusCode: ${res.statusCode}`);
  
  res.on('data', chunk => {
    data += chunk;
  });

  res.on('end', () => {
    const jsonData = JSON.parse(data);
    console.log(jsonData);
  });
});

req.on('error', error => {
  console.error(error);
});

req.end();