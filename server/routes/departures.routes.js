module.exports = app => {
    const departures = require("../controllers/departures.controller.js");

    var router = require("express").Router();

    //create new departure entry
    router.post("/", departures.create);
    
    //get all departures
    router.get("/", departures.findAll);

    // Retrieve a single LeaveUclaInfo with title
    router.get("/:title", departures.findOne);

    // Delete a Tutorial with id
    router.delete("/:title", departures.delete);

    // Delete all Tutorials
    router.delete("/", departures.deleteAll);


    app.use('/api/departures', router);
}