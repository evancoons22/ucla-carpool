module.exports = app => {
    const departures = require("../controllers/departures.controller.js");

    var router = require("express").Router();

    //create new departure entry
    router.post("/", departures.create);
    
    //get all departures
    router.get("/", departures.findAll);

    app.use('/api/departures', router);
}