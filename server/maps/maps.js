var axios = require('axios');

//takes in a date object
function secondsSinceEpoch(date) {
    return Math.floor((date.getTime() - Date.UTC(1970, 0, 1)) / 1000);
};

let user_date = new Date();
console.log(user_date);
//takes in a date object
function getDepartureTime(req, res) {
    user_date = new Date(req.body.date);
}

const seconds = secondsSinceEpoch(user_date);
console.log(seconds);

const url_start = 'https://maps.googleapis.com/maps/api/distancematrix/json?origins=34.0692755%2C-118.44578&destinations=33.942791%2C-118.410042&departure_time=';
const end_url = '&key=AIzaSyCf3Use0Z0Ff9lARNzlxcKzahBWVmpm4jY';

const url = {
    url_start: url_start,
    seconds: user_date,
    end_url: end_url,
    full_url: `${url_start}${seconds}${end_url}`
};

let urlString = JSON.stringify(url.full_url);
urlString = urlString.replace(/['"]+/g, '');
console.log(urlString);

var config = {
    method:'get',
    url: `${urlString}`,
    headers: {}
};

axios(config)
.then(function(response) {
    const dataString = JSON.stringify(response.data);
    const mapsObj = JSON.parse(dataString);
    const ride_time_traffic = mapsObj.rows[0].elements[0].duration_in_traffic.text;
    const ride_distance = mapsObj.rows[0].elements[0].distance.text;
    const ride_time_notraffic = mapsObj.rows[0].elements[0].duration.text;
    console.log(ride_time_traffic);
    console.log(ride_time_notraffic);
    console.log(ride_distance);
}) 
.catch (function(error) {
    console.log(error);
});
