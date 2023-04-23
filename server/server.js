const express = require("express");
const app = express();
const mapFunc = require('./maps/maps.js');
const cors = require('cors');

const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const db = admin.firestore();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

// helper functions

const getAllUsers = async () => {
  const usersRef = db.collection("users");
  const response = await usersRef.get();
  let responseArr = [];
  response.forEach(doc => {
    responseArr.push(doc.data());
  });
  return responseArr;
}

const getUserInfo = async (username) => {
  const userRef = db.collection("users").doc(username);
  const user = await userRef.get();
  if (typeof user.data() === 'undefined') {
    return 0;
  }
  return user.data();
}

const checkUserExists = async (username) => {
  const users = await getAllUsers();
  let user = undefined;
  users.forEach(curUser => {
    if (curUser.username === username){
      user = curUser;
    }
  })
  if (typeof user === 'undefined') {
    return 0;
  }
  return 1;
}

// returns 0 if not, and user list if true
const isUserOnDepartingFlight = async (flightNumber, username) => {
  const flightRef = db.collection("departures").doc(flightNumber);
    const flight = (await flightRef.get()).data();
    let userArr = [];
    if (flight !== undefined) {
      userArr = flight.users;
    }
    userArr.forEach(user => {
      if (user === username){
        userArr = 0;
      }
    })
    return userArr;
}

const isUserOnArrivingFlight = async (flightNumber, username) => {
  const flightRef = db.collection("arrivals").doc(flightNumber);
    const flight = (await flightRef.get()).data();
    let userArr = [];
    if (flight !== undefined) {
      userArr = flight.users;
    }
    userArr.forEach(user => {
      if (user === username){
        userArr = 0;
      }
    })
    return userArr;
}

const isDepartingFlightInUser = async (flightNumber, username) => {
  let flightArr = [];
  const user = await getUserInfo(username);
  if ( user.departures !== undefined) {
    flightArr = user.departures;
  }
  flightArr.forEach(flightNum => {
    if (flightNum === flightNumber){
      flightArr = 0;
    }
  })
  return flightArr;
}

const isArrivingFlightInUser = async (flightNumber, username) => {
  let flightArr = [];
  const user = await getUserInfo(username);
  if ( user.arrivals !== undefined) {
    flightArr = user.departures;
  }
  flightArr.forEach(flightNum => {
    if (flightNum === flightNumber){
      flightArr = 0;
    }
  })
  return flightArr;
}

// routes

app.post('/create/user', async (req, res) => {
  try {
    const id = req.body.username;
    const usersRef = db.collection("users");
    const users = await usersRef.get();
    users.forEach(doc => {
      if (doc.data().username === id){
        throw new Error("username is taken");
      }      
    });
    const userJson = {
      username: req.body.username,
      bio: req.body.bio,
      socialMedia: req.body.socialMedia,
      uclaHome: req.body.uclaHome,
    };
    const response = db.collection("users").doc(id).set(userJson);
    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

app.post('/create/:username/addDepartureFlight', async (req, res) => {
  try {
    const id = req.body.flightNumber;
    const username = req.params.username;

    // make sure user exists
    const userExists = await checkUserExists(username);
    if (userExists === 0) {
      throw new Error("User does not exist");
    }

    // make sure user can be added to flight
    let usersOnFlight = await isUserOnDepartingFlight(id, username);
    if (usersOnFlight === 0) {
      throw new Error("User already on this flight");
    }
    usersOnFlight.push(username);


    // check user's departing flights
    let userDepartingFlights = await isDepartingFlightInUser(id, username);
    if (userDepartingFlights === 0) {
      throw new Error("Arrival already recorded for current user");
    }
    userDepartingFlights.push(id);

    // update user's departing flights
    const userRef = db.collection("users").doc(username);
    userRef.update({departures: userDepartingFlights});

    // update departing flight
    const departureJson = {
      flightNumber: req.body.flightNumber,
      takeOffTime: req.body.takeOffTime,
      terminal: req.body.terminal,
      users: usersOnFlight
    }
    const response = db.collection("departures").doc(id).set(departureJson);

    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

app.post('/create/:username/addArrivalFlight', async (req, res) => {
  try {
    const id = req.body.flightNumber;
    const username = req.params.username;

    // make sure user exists
    const userExists = await checkUserExists(username);
    if (userExists === 0) {
      throw new Error("User does not exist");
    }

    // make sure user can be added to flight
    let usersOnFlight = await isUserOnArrivingFlight(id, username);
    if (usersOnFlight === 0) {
      throw new Error("User already on this flight");
    }
    usersOnFlight.push(username);


    // check user's arriving flights
    let userArrivingFlights = await isArrivingFlightInUser(id, username);
    if (userArrivingFlights === 0) {
      throw new Error("Arrival already recorded for current user");
    }
    userArrivingFlights.push(id);

    // create arrival data type
    const arrivalJson = {
      flightNumber: req.body.flightNumber,
      takeOffTime: req.body.takeOffTime,
      terminal: req.body.terminal,
      users: usersOnFlight
    }

    // update user and flight arrays
    const userRef = db.collection("users").doc(username);
    userRef.update({arrivals: userArrivingFlights});
    const response = db.collection("arrivals").doc(id).set(arrivalJson);

    res.send(response);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

app.get('/read/users', async (req, res) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch(error) {
    res.send(error);
  }
})

app.get('/read/user/:username', async (req, res) => {
  try {
    const user = await getUserInfo(req.params.username);
    if (user === 0) {
      throw new Error("User does not exist");
    }
    res.send(user);
  } catch(error) {
    console.log(error);
    res.send(error);
  }
})

app.post('/update', async (req, res) => {
  try {
    const id = req.body.id;
    const newFlightTime = req.body.newFlightTime;
    const userRef = await db.collection("users").doc(id)
    .update({
      flightTime: newFlightTime
    })
    res.send(userRef);
  } catch(error) {
    res.send(error);
  }
})

const getDriveTime = async() => {
  const t = await mapFunc.getRideTime();
  console.log("IN server ", t);
  return t;
}

const getDriveDist = async() => {
  const dist = await mapFunc.getRideDist();
  console.log("In Server, distance ", dist);
  return dist;
}

//all dates MUST BE IN THE FUTURE
const setDepartureTime = async (leaveDate) => {
   mapFunc.getDepartureTime(leaveDate);
  console.log("In server, set departure time to", leaveDate);
}

// SECOND ROUND OF ENDPOINTS

app.post('/create/event/timed', async (req, res) => {
  try {
    const username = req.body.username;
    const flightTime = req.body.flightTime;
    const eventsRef = db.collection("events");
    const events = await eventsRef.get();
    events.forEach(doc => {
      if (doc.data().username === username && doc.data().flight_time === flightTime) {
        throw new Error("user and flight time combination is already being used");
      }
    })
    const eventJson = {
      username: req.body.username,
      social_media_handle: req.body.social_media_handle,
      flight_time: req.body.flight_time,
      arrival_or_departure: req.body.arrival_or_departure,
    };
    const response = db.collection("events").add(eventJson);
    res.send(response);    
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

app.get('/read/timed/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const eventRef = db.collection("events").doc(String(id));
    const event = await eventRef.get();
    let info; 
    console.log(event.data());
    if (typeof (event.data()) === 'undefined') {
      throw new Error("event not found");
    }
    else {
      info = event.data();
    }
    res.send(info);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

app.get('/read/allTimed', async (req, res) => {
  try {
    const eventsRef = db.collection("events");
    const events = await eventsRef.get();
    let eventsList = [];
    events.forEach(event => {
      eventsList.push(event.data());
    })
    res.send(eventsList);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
})

//cors
app.use(cors({
    origin: '*'
}));

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
