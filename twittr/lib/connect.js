const dotenv = require("dotenv");
dotenv.config();

const mysql = require("mysql2");
const connection = mysql.createConnection(process.env.DATABASE_URL);

console.log("Connected to database");

module.exports = connection;
