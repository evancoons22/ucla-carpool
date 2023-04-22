const express = require("express");
const app = express();

const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const db = admin.firestore();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

// routes
app.post('/createUser', async (req, res) => {
  try {
    const id = req.body.username;
    const userJson = {
      username: req.body.username,
      flightNumber: req.body.flightNumber,
      flightTime: req.body.flightTime,
      socialMedia: req.body.socialMedia
    };
    const response = db.collection("users").add(userJson);
    res.send(response);
  } catch (error) {
    res.send(error);
  }
})

app.get('/read/all', async (req, res) => {
  try {
    const usersRef = db.collection("users");
    const response = await usersRef.get();
    let responseArr = [];
    response.forEach(doc => {
      responseArr.push(doc.data());
    });
    res.send(responseArr);
  } catch(error) {
    res.send(error);
  }
})

app.get('read/:id', async (req, res) => {
  try {
    const userRef = db.collection("users").doc(req.params.id);
    const response = await userRef.get();
    res.send(response.data());
  } catch(error) {
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

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
