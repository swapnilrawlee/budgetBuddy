const mysql = require('mysql2');

// Create a connection pool
// const pool = mysql.createPool({
//   host: 'localhost', // Your database host
//   user: 'root',      // Your database user
//   password: '123456',      // Your database password
//   database: 'budgetbuddy' // Your database name
// });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
   user: process.env.DB_USER,
   password: process.env.DB_PASSWORD,
   database: process.env.DB_NAME,
});

// Promisify for Node.js async/await.
const promisePool = pool.promise();

module.exports = promisePool;
