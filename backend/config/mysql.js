const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
  host: 'localhost', // Your database host
  user: 'root',      // Your database user
  password: '123456',      // Your database password
  database: 'budgetbuddy' // Your database name
});

// Promisify for Node.js async/await.
const promisePool = pool.promise();

module.exports = promisePool;
