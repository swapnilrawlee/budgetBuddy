const express = require('express');
const router = express.Router();
const mysql2 = require('mysql2');

// Create a connection pool
const pool = mysql2.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'budgetbuddy',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const promisePool = pool.promise(); // To use promises with MySQL queries

// Get all transactions
router.get('/transactions', async (req, res) => {
  const user_id = req.query.user_id; // Get user_id from query parameters

  if (!user_id) {
    return res.status(400).send({ error: 'User ID is required.' });
  }

  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM transactions WHERE user_id = ?',
      [user_id]
    );
    res.send(rows);
  } catch (error) {
    console.error('Error fetching transactions:', error); // Log the error for debugging
    res.status(500).send({ error: 'Error fetching transactions.' });
  }
});


// Recent 3 transactions
// Recent 3 transactions for a specific user
router.get('/recenttransactions', async (req, res) => {
  const user_id = req.query.user_id; // Get user_id from query parameters

  if (!user_id) {
    return res.status(400).send({ error: 'User ID is required.' });
  }

  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 3',
      [user_id]
    );
    res.send(rows);
  } catch (error) {
    console.error('Error fetching recent transactions:', error); // Log the error for debugging
    res.status(500).send({ error: 'Error fetching recent transactions.' });
  }
});


// Total transaction of income and expense
router.get('/transactions/summary', async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: 'User ID is required.' });
  }

  try {
    const [rows] = await promisePool.query(`
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expenses
      FROM transactions
      WHERE user_id = ?
    `, [user_id]);
    res.send(rows[0]); // Send the result as an object
  } catch (error) {
    console.error('Error calculating totals:', error);
    res.status(500).send({ error: 'Error calculating totals.' });
  }
});

// Total transaction amount
router.get('/transactions/total', async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: 'User ID is required.' });
  }

  try {
    const [rows] = await promisePool.query(`
      SELECT SUM(amount) AS total FROM transactions WHERE user_id = ?
    `, [user_id]);
    res.send(rows[0]);
  } catch (error) {
    console.error('Error calculating total amount:', error);
    res.status(500).send({ error: 'Error calculating total amount.' });
  }
});


// Net balance
router.get('/transactions/net-balance', async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: 'User ID is required.' });
  }

  try {
    const [rows] = await promisePool.query(`
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS net_balance
      FROM transactions
      WHERE user_id = ?
    `, [user_id]);
    res.send(rows[0]); // Send the net balance as a response
  } catch (error) {
    console.error('Error calculating net balance:', error);
    res.status(500).send({ error: 'Error calculating net balance.' });
  }
});


// Add a new transaction
router.post('/transactions', async (req, res) => {
  const { category, amount, type, user_id } = req.body;

  if (!category || isNaN(amount) || amount <= 0 || !['income', 'expense'].includes(type) || !user_id) {
    return res.status(400).send({ error: 'Invalid input data.' });
  }

  try {
    const [result] = await promisePool.query(
      'INSERT INTO transactions (category, amount, type, user_id) VALUES (?, ?, ?, ?)',
      [category, amount, type, user_id]
    );

    const newTransaction = {
      id: result.insertId,
      category,
      amount,
      type,
      user_id 
    };

    res.send(newTransaction);
  } catch (error) {
    console.error('Error adding transaction:', error); // Log the error for debugging
    res.status(500).send({ error: 'Error adding transaction.', details: error });
  }
});

// Chart data
router.get('/transactions/chart-data', async (req, res) => {
  try {
    const queryExpenses = `
      SELECT DATE(created_at) as date, SUM(amount) as total
      FROM transactions
      WHERE type = 'expense'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at)
    `;

    const queryIncome = `
      SELECT DATE(created_at) as date, SUM(amount) as total
      FROM transactions
      WHERE type = 'income'
      GROUP BY DATE(created_at)
      ORDER BY DATE(created_at)
    `;

    const [expensesResults] = await promisePool.query(queryExpenses);
    const [incomeResults] = await promisePool.query(queryIncome);

    // Format data for Chart.js
    const labels = [];
    const expenses = [];
    const income = [];

    expensesResults.forEach((row) => {
      labels.push(row.date);
      expenses.push(row.total);
    });

    incomeResults.forEach((row) => {
      if (!labels.includes(row.date)) {
        labels.push(row.date);
      }
      income.push(row.total);
    });

    // Align expenses and income data with labels
    const expenseData = labels.map((label) => {
      const item = expensesResults.find((row) => row.date === label);
      return item ? item.total : 0;
    });

    const incomeData = labels.map((label) => {
      const item = incomeResults.find((row) => row.date === label);
      return item ? item.total : 0;
    });

    res.json({ labels, expenses: expenseData, income: incomeData });
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a transaction
router.delete('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const user_id = req.query.user_id; // Get user_id from query parameters

  if (!user_id) {
    return res.status(400).send({ error: 'User ID is required.' });
  }

  try {
    // Check if the transaction exists and belongs to the user
    const [transaction] = await promisePool.query(
      'SELECT * FROM transactions WHERE id = ? AND user_id = ?',
      [id, user_id]
    );

    if (transaction.length === 0) {
      return res.status(404).send({ error: 'Transaction not found or unauthorized.' });
    }

    // Proceed to delete the transaction
    const [result] = await promisePool.query(
      'DELETE FROM transactions WHERE id = ? AND user_id = ?',
      [id, user_id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).send({ error: 'Transaction not found.' });
    }

    res.send({ message: 'Transaction deleted' });
  } catch (error) {
    console.error('Error deleting transaction:', error); // Log the error for debugging
    res.status(500).send({ error: 'Error deleting transaction.', details: error });
  }
});

module.exports = router;
