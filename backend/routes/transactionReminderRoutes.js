const express = require('express');
const router = express.Router();
const db = require("../config/database");

// POST / - Add a new reminder
router.post('/', async (req, res) => {
  try {
    const { user_id, transactionDate, name, amount } = req.body;

    // Input validation
    if (!user_id || !transactionDate || !name || !amount) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    if (name.length > 20) {
      return res.status(400).json({ error: 'Name should not exceed 20 characters.' });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ error: 'Amount should be a positive number.' });
    }

    // Insert into the database
    const [result] = await db.query(
      'INSERT INTO reminders (user_id, transaction_date, name, amount) VALUES (?, ?, ?, ?)',
      [user_id, transactionDate, name, amount]
    );

    res.status(201).json({ message: 'Reminder added successfully', id: result.insertId });
  } catch (error) {
    console.error('Error adding reminder:', error);
    res.status(500).json({ error: 'An error occurred while adding the reminder.' });
  }
});

// GET / - Fetch all reminders for a user
router.get('/', async (req, res) => {
  try {
    const user_id = req.query.user_id; // Assuming user_id is passed as a query parameter

    if (!user_id) {
      return res.status(400).json({ error: 'User ID is required.' });
    }

    // Fetch reminders for the given user_id
    const [result] = await db.query('SELECT * FROM reminders WHERE user_id = ?', [user_id]);

    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching reminders:', error);
    res.status(500).json({ error: 'An error occurred while fetching reminders.' });
  }
});

// GET /upcoming - Fetch upcoming three transactions
router.get('/upcoming', async (req, res) => {
  const { user_id } = req.query;

  if (!user_id) {
    return res.status(400).json({ message: 'User ID is required' });
  }

  try {
    // Delete transactions where the date has passed
    await db.query(
      'DELETE FROM reminders WHERE user_id = ? AND transaction_date < CURDATE()',
      [user_id]
    );

    // Query to fetch the upcoming three transactions
    const [result] = await db.query(
      'SELECT * FROM reminders WHERE user_id = ? AND transaction_date >= CURDATE() ORDER BY transaction_date ASC LIMIT 3',
      [user_id]
    );

    if (result.length === 0) {
      return res.status(404).json({ message: 'No upcoming transactions found' });
    }

    res.json(result);
  } catch (error) {
    console.error('Error fetching upcoming transactions:', error);
    res.status(500).json({ message: 'An error occurred while fetching transactions.' });
  }
});

// DELETE /:id - Delete a reminder by ID
router.delete('/:id', async (req, res) => {
  try {
    const reminderId = req.params.id;

    // Delete the reminder
    const [result] = await db.query('DELETE FROM reminders WHERE id = ?', [reminderId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    res.status(200).json({ message: 'Reminder deleted successfully.' });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    res.status(500).json({ error: 'An error occurred while deleting the reminder.' });
  }
});

module.exports = router;