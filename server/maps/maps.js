var axios = require('axios');

//takes in a date object
function secondsSinceEpoch(date) {
    return Math.floor((date.getTime() - Date.UTC(1970, 0, 1)) / 1000);
};

//sets default time to now
let user_date = new Date();

//takes in a date object, sets departure time to input if called
function getDepartureTime(req, res) {
    user_date = req;
    console.log(user_date);
}

// const testDate = new Date(2023, 3, 24, 10, 30, 0);
// getDepartureTime(testDate);

const seconds = secondsSinceEpoch(user_date);
//console.log(seconds);

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
//console.log(urlString);


function fetchData() {
    return axios.get(`${urlString}`)
    .then(response => {
        const dataString = JSON.stringify(response.data);
        const mapsObj = JSON.parse(dataString);
        return mapsObj;
    })
    .catch(error => {
        console.error(error);
    });
};


function getRideTime() {
    fetchData()
    .then(data => {
        const ride_time_traffic = data.rows[0].elements[0].duration_in_traffic.text;
        //console.log(ride_time_traffic);
        return ride_time_traffic;
    })
    .catch(error => {
        console.error(error);
    })
}

function getRideDist() {
    fetchData()
    .then(data => {
        const ride_distance = data.rows[0].elements[0].distance.text;
        //console.log(ride_distance);
        return ride_distance;
    })
    .catch(error => {
        console.error(error);
    })
}


module.exports = {
    getRideTime,
    getRideDist,
    getDepartureTime
};

