require('dotenv').config({ path: './.env' });
const https = require('https');
console.log(process.env.FLIGHT_AWARE_API);
const util = require('util');
const moment = require('moment-timezone');
const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});


const arrivalCollection = admin.firestore().collection('arrivals');
const departureCollection = admin.firestore().collection('departures');
function addOrUpdateFlight(flightObject, collection){
  const docRef = collection.doc(flightObject.uniqueid);
  const existingFlight = collection.where("uniqueid", "==", flightObject.uniqueid);

  // Try to update the existing flight, or create a new one if none exists
  existingFlight.get().then(querySnapshot => {
    if (querySnapshot.empty) {
      // No existing flight found, create a new one
      docRef.set(flightObject)
        .then(() => {
          console.log("New flight added with ID: ", docRef.id);
        })
        .catch(error => {
          console.error("Error adding flight: ", error);
        });
    } else {
      // Update the existing flight
      querySnapshot.forEach(doc => {
        doc.ref.set(flightObject, { merge: true })
          .then(() => {
            console.log("Flight updated with ID: ", doc.id);
          })
          .catch(error => {
            console.error("Error updating flight: ", error);
          });
      });
    }
  }).catch(error => {
    console.error("Error querying for flight: ", error);
  });
}

function objectResize(flightObject){
  return {
    uniqueid: flightObject.fa_flight_id,
    ident: flightObject.ident ?? null,
    operator: flightObject.operator ?? null,
    flight_number: flightObject.flight_number ?? null,
    blocked: flightObject.blocked ?? null,
    diverted: flightObject.diverted ?? null,
    canceled: flightObject.cancelled ?? null,
    origin_airport_code_IATA: flightObject.origin?.code_iata ?? null,
    origin_airport_code_ICAO: flightObject.origin?.code_icao ?? null,
    origin_airport_name: flightObject.origin?.name ?? null,
    origin_destination_code_IATA: flightObject.destination?.code_iata ?? null,
    origin_destination_code_ICAO: flightObject.destination?.code_icao ?? null,
    destination_airport_name: flightObject.destination?.name ?? null,
    departure_delay: flightObject.departure_delay ?? null,
    arrival_delay: flightObject.arrival_delay ?? null,
    scheduled_out: flightObject.scheduled_out 
      ? moment.utc(flightObject.scheduled_out).tz('PST8PDT').format('YYYY-MM-DD hh:mm:ss A z') : null,
    estimated_out: flightObject.estimated_out
      ? moment.utc(flightObject.estimated_out).tz('PST8PDT').format('YYYY-MM-DD hh:mm:ss A z') : null,
    actual_out: flightObject.actual_out 
      ? moment.utc(flightObject.actual_out).tz('PST8PDT').format('YYYY-MM-DD hh:mm:ss A z') : null,
    scheduled_off: flightObject.scheduled_off 
      ? moment.utc(flightObject.scheduled_off).tz('PST8PDT').format('YYYY-MM-DD hh:mm:ss A z') : null,
    estimated_off: flightObject.estimated_off 
      ? moment.utc(flightObject.estimated_off).tz('PST8PDT').format('YYYY-MM-DD hh:mm:ss A z') : null,
    actual_off: flightObject.actual_off
      ? moment.utc(flightObject.actual_off).tz('PST8PDT').format('YYYY-MM-DD hh:mm:ss A z') : null,
    scheduled_on: flightObject.scheduled_on
      ? moment.utc(flightObject.scheduled_on).tz('PST8PDT').format('YYYY-MM-DD hh:mm:ss A z') : null,
    estimated_on: flightObject.estimated_on
      ? moment.utc(flightObject.estimated_on).tz('PST8PDT').format('YYYY-MM-DD hh:mm:ss A z') : null,
    actual_on: flightObject.actual_on
      ? moment.utc(flightObject.actual_on).tz('PST8PDT').format('YYYY-MM-DD hh:mm:ss A z') : null,
    scheduled_in: flightObject.scheduled_in
      ? moment.utc(flightObject.scheduled_in).tz('PST8PDT').format('YYYY-MM-DD hh:mm:ss A z') : null,
    estimated_in: flightObject.estimated_in
      ? moment.utc(flightObject.estimated_in).tz('PST8PDT').format('YYYY-MM-DD hh:mm:ss A z') : null,
    actual_in: flightObject.actual_in
      ? moment.utc(flightObject.actual_in).tz('PST8PDT').format('YYYY-MM-DD hh:mm:ss A z') : null, 
    lastUpdatedAt: admin.firestore.Timestamp.now()
  }
}


//TODO: lol "next": "/airports/KLAX/flights?type=Airline&start=2023-04-21&end=2023-04-22&cursor=ce2414412c9f2b6"

// Set the time zone to PST (-8 hours offset from UTC)
const timeZone = 'America/Los_Angeles';
const timeZoneOffset = moment.tz(timeZone).utcOffset();

// Get the current date and time in UTC
let currentDate = moment.utc();

// Add 2 days to the current date to get the end date
let endDate = moment.utc().add(2, 'days');

// Subtract 1 day and apply the time zone offset to get the start date
let startDate = moment.tz(currentDate, timeZone).subtract(1, 'day').utcOffset(timeZoneOffset).startOf('day');

// Format the dates as strings in the desired format
let start = startDate.format('YYYY-MM-DD[T]HH:mm:ss[Z]');
let end = endDate.format('YYYY-MM-DD[T]HH:mm:ss[Z]');

console.log(start);
console.log(end);


// =========

async function makeRequest(start, end, url) {
  const options = {
    hostname: 'aeroapi.flightaware.com',
    path: '/aeroapi' + url,
    method: 'GET',
    headers: {
      'Accept': 'application/json; charset=UTF-8',
      'x-apikey': process.env.FLIGHT_AWARE_API
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      console.log(`statusCode: ${res.statusCode}`);
    
      res.on('data', chunk => {
        data += chunk;
      });

      res.on('end', () => {
        const jsonData = JSON.parse(data);
        console.log(jsonData);
        for (let arrival of jsonData.scheduled_arrivals){
          addOrUpdateFlight(objectResize(arrival), arrivalCollection);
        }
        for (let departure of jsonData.scheduled_departures){
          addOrUpdateFlight(objectResize(departure), departureCollection);
        }
        if (jsonData.links.next) {
          setTimeout(() => {
            resolve(makeRequest(start, end, jsonData.links.next));
          }, 300000);
        } else {
          resolve();
        }
      });
    });

    req.on('error', error => {
      console.error(error);
      reject(error);
    });

    req.end();
  });
}

// =========


url = '/airports/KLAX/flights?type=Airline&start=' + start + '&end=' + end + '&max_pages=10'
makeRequest(start, end, url)