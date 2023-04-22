const LeaveUclaInfo = require("../models/departures.model.js");

// Create and Save a new LeaveUclaInfo object
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
        message: "Content can not be empty!"
    });
  }

  // Create LeaveUclaInfo object
  const newLeaveUclaInfo = new LeaveUclaInfo (
    req.body.pickUpLocation,
    req.body.flightDepartureTime,
    req.body.preferredPickUpTime,
    req.body.name,
  );

  // Save depatureInfo in the database
  LeaveUclaInfo.create(newLeaveUclaInfo, (err, data) => {
    if (err)
        res.status(500).send({
            message:
                err.message || "Some error occured while creating the LeaveUclaInfo object"
        });
    else res.send(data);
    });
};

// Retrieve all depatures from the database (with condition).
exports.findAll = (req, res) => {
    const title = req.query.title;

    LeaveUclaInfo.getAll(title, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
      else res.send(data);
    });
};


// Find a single Tutorial with a id
exports.findOne = (req, res) => {
  LeaveUclaInfo.findById(req.params.title, (err, data) => {
    if (err) {
        if (err.kind == "not_found") {
            res.status(404).send({
                message: `Not found LeaveUclaInfo object with title ${req.params.title}.`
            });
        } else {
            res.status(500).send({
                message: "Error retrieving LeaveUclaInfo object with title " + req.params.title
            });
        }
    }  else res.send(data);
  });
};
  
// Delete a LeaveUclaInfo object with the specified title in the request
exports.delete = (req, res) => {
    LeaveUclaInfo.remove(req.params.title, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found LeaveUclaObject with title ${req.params.title}.`
          });
        } else {
          res.status(500).send({
            message: "Could not delete Tutorial with title " + req.params.title
          });
        }
      } else res.send({ message: `LeaveUclaInfo object was deleted successfully!` });
    });
  };

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
    LeaveUclaInfo.removeAll((err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while removing all LeaveUclaInfo objects."
        });
      else res.send({ message: `All LeaveUclaInfo objects were deleted successfully!` });
    });
  };
