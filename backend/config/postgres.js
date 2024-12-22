require("dotenv").config();
const postgres = require("postgres");

// Database connection using postgres
const db = postgres(process.env.DATABASE_URL, {
    host: process.env.host,
    port: process.env.db_port,
    database: process.env.database,
    user: process.env.user,
    pool_mode: process.env.pool_mode,
  });
  module.exports =db;