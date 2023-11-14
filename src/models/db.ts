import mysql from "mysql2";
import dbConfig from "../config/db.config";
// Hook up the HTTP logger.
require("dotenv").config();
// Create a connection to the database
const connection = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
});

// open the MySQL connection

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

module.exports = connection;
