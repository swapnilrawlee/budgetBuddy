const express = require('express');
const router = express.Router();
const db = require("../config/postgres"); // Assuming db is the PostgreSQL connection instance

// Get all transactions for a specific user
router.get('/transactions', async (req, res) => {
  const user_id = req.query.user_id; 

  if (!user_id) {
    return res.status(400).send({ error: 'User ID is required.' });
  }

  try {
    const result = await db.query('SELECT * FROM transactions WHERE user_id = $1', [user_id]);
    console.log(result.rows);
    res.send(result.rows); // Access PostgreSQL query result via `rows`
  } catch (error) {
    console.error('Error fetching transactions:', error); // Log the error for debugging
    res.status(500).send({ error: 'Error fetching transactions.' });
  }
});

// Get the 3 most recent transactions for a specific user
router.get('/recenttransactions', async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: 'User ID is required.' });
  }

  try {
    const result = await db.query(
      'SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 3',
      [user_id]
    );
    res.send(result.rows);
  } catch (error) {
    console.error('Error fetching recent transactions:', error);
    res.status(500).send({ error: 'Error fetching recent transactions.' });
  }
});

// Get summary of income and expenses for a user
router.get('/transactions/summary', async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: 'User ID is required.' });
  }

  try {
    const result = await db.query(`
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expenses
      FROM transactions
      WHERE user_id = $1
    `, [user_id]);
    res.send(result.rows[0]); // Access PostgreSQL query result via `rows`
  } catch (error) {
    console.error('Error calculating totals:', error);
    res.status(500).send({ error: 'Error calculating totals.' });
  }
});

// Get total transaction amount for a user
router.get('/transactions/total', async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: 'User ID is required.' });
  }

  try {
    const result = await db.query(`
      SELECT SUM(amount) AS total FROM transactions WHERE user_id = $1
    `, [user_id]);
    res.send(result.rows[0]); // Access PostgreSQL query result via `rows`
  } catch (error) {
    console.error('Error calculating total amount:', error);
    res.status(500).send({ error: 'Error calculating total amount.' });
  }
});

// Get net balance for a user (income - expenses)
router.get('/transactions/net-balance', async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: 'User ID is required.' });
  }

  try {
    const result = await db.query(`
      SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS net_balance
      FROM transactions
      WHERE user_id = $1
    `, [user_id]);
    res.send(result.rows[0]); // Access PostgreSQL query result via `rows`
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
    const result = await db.query(
      'INSERT INTO transactions (category, amount, type, user_id) VALUES ($1, $2, $3, $4) RETURNING id',
      [category, amount, type, user_id]
    );

    const newTransaction = {
      id: result.rows[0].id,
      category,
      amount,
      type,
      user_id
    };

    res.send(newTransaction);
  } catch (error) {
    console.error('Error adding transaction:', error);
    res.status(500).send({ error: 'Error adding transaction.', details: error });
  }
});

// Get transaction chart data (expenses vs income over time)
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

    const expensesResult = await db.query(queryExpenses);
    const incomeResult = await db.query(queryIncome);

    const labels = Array.from(new Set([
      ...expensesResult.rows.map(row => row.date),
      ...incomeResult.rows.map(row => row.date)
    ])).sort();

    const expenseData = labels.map(label => {
      const item = expensesResult.rows.find(row => row.date === label);
      return item ? item.total : 0;
    });

    const incomeData = labels.map(label => {
      const item = incomeResult.rows.find(row => row.date === label);
      return item ? item.total : 0;
    });

    res.json({ labels, expenses: expenseData, income: incomeData });
  } catch (error) {
    console.error('Error fetching chart data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a transaction by ID
router.delete('/transactions/:id', async (req, res) => {
  const { id } = req.params;
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: 'User ID is required.' });
  }

  try {
    const result = await db.query(
      'SELECT * FROM transactions WHERE id = $1 AND user_id = $2',
      [id, user_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send({ error: 'Transaction not found or unauthorized.' });
    }

    await db.query('DELETE FROM transactions WHERE id = $1 AND user_id = $2', [id, user_id]);
    res.send({ message: 'Transaction deleted' });
  } catch (error) {
    console.error('Error deleting transaction:', error);
    res.status(500).send({ error: 'Error deleting transaction.' });
  }
});

module.exports = router;
