const express = require('express');
const router = express.Router();
const db = require("../config/postgres"); // Assuming db is the PostgreSQL connection instance

// POST / - Add a new reminder
router.post('/', async (req, res) => {
  try {
    const { user_id, transactionDate, name, amount } = req.body;
    console.log(req.body);

    // Insert into the database
    const result = await db`
      INSERT INTO reminders (user_id, transaction_date, name, amount)
      VALUES (${user_id}, ${transactionDate}, ${name}, ${amount})
      RETURNING id
    `;

    res.status(201).json({ message: 'Reminder added successfully', id: result[0].id });
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
    const result = await db`SELECT * FROM reminders WHERE user_id = ${user_id}`;

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
    // Query to fetch the upcoming three transactions
    const result = await db`
      SELECT * FROM reminders WHERE user_id = ${user_id} AND transaction_date >= CURRENT_DATE ORDER BY transaction_date ASC LIMIT 3`;

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
    await db`DELETE FROM reminders WHERE id = ${reminderId}`;

    res.status(200).json({ message: 'Reminder deleted successfully.' });
  } catch (error) {
    console.error('Error deleting reminder:', error);
    res.status(500).json({ error: 'An error occurred while deleting the reminder.' });
  }
});

module.exports = router;
