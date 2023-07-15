const debug = require("debug")("app:database");
const config = require("../config");

const mysql = require("mysql2");
const connection = mysql.createConnection(config.databaseUrl);

debug("Connected to database");

module.exports = connection;
