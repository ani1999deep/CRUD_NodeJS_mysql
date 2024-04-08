//Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());

//Establish the database connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "dbschoolstd",
});

db.connect(function (error) {
  if (error) {
    console.log("Error arrise");
  } else {
    console.log("Successfully connceted to db");
  }
});
//PORT Define
server.listen(8085, function check(error) {
  if (error) {
    console.log("Error...");
  } else {
    console.log("Sucessfully started the PORT!");
  }
});
//POST Method
server.post("/api/student/add", (req, res) => {
  let details = {
    stname: req.body.stname,
    course: req.body.course,
    fee: req.body.fee,
  };
  let sql = "INSERT INTO student SET ?";
  db.query(sql, details, (error) => {
    if (error) {
      res.send({ status: false, message: "Student Craeted Failed" });
    } else {
      res.send({ status: true, message: "Student Created Sucessfully" });
    }
  });
});
//View the records
server.get("/api/student", (req, res) => {
  var sql = "SELECT * FROM student";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error connecting to db");
    } else {
      res.send({ status: true, data: result });
    }
  });
});
