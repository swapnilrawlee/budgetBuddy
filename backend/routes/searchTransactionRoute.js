const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');
const excel = require('exceljs');

// Create a connection pool
// const pool = mysql2.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '123456',
//   database: 'budgetbuddy',
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

const pool = mysql2.createPool({
  
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,
});

const promisePool = pool.promise();

router.get('/transactions/export', async (req, res) => {
  try {
    const { user_id } = req.query; // Read user_id from query parameters

    if (!user_id) {
      return res.status(400).send({ error: 'User ID is required.' });
    }

    const [transactions] = await promisePool.query(
      'SELECT category, amount, type, created_at FROM transactions WHERE user_id = ?',
      [user_id] // Use user_id from query parameters
    );

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Transactions');

    worksheet.columns = [
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Type', key: 'type', width: 10 },
      { header: 'Date', key: 'created_at', width: 25 },
    ];

    worksheet.addRows(transactions);

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=transactions.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exporting transactions:', error);
    res.status(500).send({ error: 'Error exporting transactions.' });
  }
});



// Assuming you have a connection to MySQL with `promisePool`

router.get('/transactions', async (req, res) => {
  const { search, user_id } = req.query;

  try {
    if (!user_id) {
      return res.status(400).send({ error: 'User ID is required.' });
    }

    let query = 'SELECT * FROM transactions WHERE user_id = ?';
    let params = [user_id];

    if (search) {
      query += ` AND (category LIKE ? OR type LIKE ? OR amount LIKE ?)`;
      const searchPattern = `%${search}%`;
      params.push(searchPattern, searchPattern, searchPattern);
    }

    const [rows] = await promisePool.query(query, params);
    res.send(rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send({ error: 'Error fetching transactions.' });
  }
});


module.exports = router;
