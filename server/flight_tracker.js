const https = require('https');

const options = {
  hostname: 'flightxml.flightaware.com',
  path: '/json/FlightXML3/Search',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer YlMdNSLz1cxaYLDubBSlhpsG4kzKRXfg'
  }
};

const req = https.request(options, res => {
  console.log(`statusCode: ${res.statusCode}`);

  res.on('data', d => {
    process.stdout.write(d);
  });
});

req.on('error', error => {
  console.error(error);
});

const postData = JSON.stringify({
  "query": "arrived >= 'YYYY/MM/DD 00:00:00' and arrived <= 'YYYY/MM/DD 23:59:59' and destination = 'KLAX'",
  "howMany": 15,
  "offset": 0
});

req.write(postData);
req.end();