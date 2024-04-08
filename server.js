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
  let sql = "SELECT * FROM student";
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error connecting to db");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Search the records
server.get("/api/student/:id", (req, res) => {
  let studentid = req.params.id;
  let sql = "SELECT * FROM student WHERE id=" + studentid;
  db.query(sql, function (error, result) {
    if (error) {
      console.log("Error in search records");
    } else {
      res.send({ status: true, data: result });
    }
  });
});

//Update the records
server.put("/api/student/updated/:id", (req, res) => {
  let sql =
    "UPDATE student SET stname=" +
    req.body.stname +
    ",course=" +
    req.body.course +
    ",fee=" +
    req.body +
    fee +
    "WHERE id=" +
    res.body.id;

  let a = db.query(sql, (error, result) => {
    if (error) {
      res.send({ status: false, message: "Updated failed" });
    } else {
      res.send({ status: true, message: "Sucessfully Updated" });
    }
  });
});
