require("dotenv").config();
const mysql = require("mysql2");

// Database connection using mysql2
const db = mysql.createPool({
    host: process.env.host,
    port: process.env.db_port,
    database: process.env.database,
    user: process.env.user,
    password: process.env.password,
    connectionLimit: process.env.connection_limit || 10, // Default to 10 if not specified
}).promise();

module.exports = db;