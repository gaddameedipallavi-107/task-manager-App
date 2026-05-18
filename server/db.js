const mysql = require("mysql2");
require("dotenv").config();

const connection = mysql.createConnection({
  host: "localhost",
  user: "system",
  password: "manager",
  database: "taskmanager"
});

connection.connect((err) => {
  if(err){
    console.log("Database Connection Failed");
    console.log(err);
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = connection;