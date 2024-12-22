const mysql = require('mysql2');

// Create a connection pool
// const pool = mysql.createPool({
//   host: 'localhost', // Your database host
//   user: 'root',      // Your database user
//   password: '123456',      // Your database password
//   database: 'budgetbuddy' // Your database name
// });

const pool = mysql.createPool({
  host: 'sql105.infinityfree.com',
  user: 'if0_37672388',      // Your database user
  password: '9167534208',      // Your database password
  database: 'if0_37672388_budgetbuddy_DB' // Your database name
});

// Promisify for Node.js async/await.
const promisePool = pool.promise();

module.exports = promisePool;
