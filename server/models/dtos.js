const sql = require("./db.js");

// constructor
const LeaveUclaInfo = function(leaveUclaInfo) {
  this.pickUpLocation = leaveUclaInfo.pickUpLocation;
  this.flightDepartureTime = leaveUclaInfo.flightDepartureTime;
  this.preferredPickUpTime = leaveUclaInfo.preferredPickUpTime;
};


// TODO: make leaveUclaInfo table
LeaveUclaInfo.create = (newLeaveUclaInfo, result) => {
  sql.query("INSERT INTO leaveUclaInfo SET ?", newLeaveUclaInfo, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created leaveUCLA: ", { id: res.insertId, ...newLeaveUclaInfo });
    result(null, { id: res.insertId, ...newLeaveUclaInfo });
  });
};

LeaveUclaInfo.findById = (id, result) => {
  sql.query(`SELECT * FROM leaveUclaInfo WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found leaveUCLA: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

LeaveUclaInfo.getAll = (title, result) => {
  let query = "SELECT * FROM leaveUclaInfo";

  if (title) {
    query += ` WHERE flightDepartureTime LIKE '%${flightDepartureTime}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("leaveUclaInfo: ", res);
    result(null, res);
  });
};


LeaveUclaInfo.remove = (id, result) => {
  sql.query("DELETE FROM leaveUclaInfo WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted leaveUclaInfo with id: ", id);
    result(null, res);
  });
};

LeaveUclaInfo.removeAll = result => {
  sql.query("DELETE FROM leaveUclaInfo", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} leaveUclaInfo`);
    result(null, res);
  });
};

module.exports = LeaveUclaInfo;
