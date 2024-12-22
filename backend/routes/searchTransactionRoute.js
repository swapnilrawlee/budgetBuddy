const express = require('express');
const router = express.Router();
const excel = require('exceljs');
const db = require('../config/postgres'); 

// Route to export transactions to Excel
router.get('/transactions/export', async (req, res) => {
  try {
    const { user_id } = req.query; 

    if (!user_id) {
      return res.status(400).send({ error: 'User ID is required.' });
    }

    // Query to fetch the transactions
    const result = await db.query(`
      SELECT category, amount, type, created_at
      FROM transactions
      WHERE user_id = $1
    `, [user_id]);

    const transactions = result.rows;

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Transactions');

    worksheet.columns = [
      { header: 'Category', key: 'category', width: 20 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Type', key: 'type', width: 10 },
      { header: 'Date', key: 'created_at', width: 25 },
    ];

    // Add the rows from the transactions array
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

// Route to fetch transactions with optional search
router.get('/transactions', async (req, res) => {
  const { search, user_id } = req.query;

  try {
    if (!user_id) {
      return res.status(400).send({ error: 'User ID is required.' });
    }

    let query = 'SELECT * FROM transactions WHERE user_id = $1';
    const params = [user_id];

    // Add search filter if a search term is provided
    if (search) {
      query += ` AND (category ILIKE $2 OR type ILIKE $2 OR amount::text ILIKE $2)`;
      params.push('%' + search + '%');
    }

    const result = await db.query(query, params);
    res.send(result.rows);
  } catch (error) {
    console.error('Error fetching transactions:', error);
    res.status(500).send({ error: 'Error fetching transactions.' });
  }
});

module.exports = router;
