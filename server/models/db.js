const mysql = require("mysql");
const dbConfig = require("../config/db.config.js");

// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// open the MySQL connection
connection.connect(error => {
    if (error) throw error;
    console.log("Successfully connected to the database.");

    connection.query("CREATE DATABASE IF NOT EXISTS uclaCarpool", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });

    connection.query("USE uclaCarpool", function (err, result) {
        if (err) throw err;
        console.log("Using database");
    });

    connection.query("CREATE TABLE IF NOT EXISTS leaveUclaInfo ( \
        id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT, \
        name varchar(255) NOT NULL, \
        pickUpLocation varchar(255) NOT NULL, \
        flightDepartureTime TIME NOT NULL, \
        preferredPickUpTime TIME NOT NULL, \
        PickUpDate DATE NOT NULL, \
        FlightDate DATE NOT NULL \
        )",
        function (err, result) {
            if (err) throw err;
            console.log("Created departures table");
    });
      
  });

module.exports = connection;
