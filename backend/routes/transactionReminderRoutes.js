const express = require('express');
const router = express.Router();
const mysql = require('mysql2'); // Ensure mysql2 is installed and required

// Create a MySQL connection pool
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root', // Your MySQL username
//     password: '123456', // Your MySQL password
//     database: 'budgetbuddy' // Your database name
// });

const pool = mysql.createPool({
   
 host: process.env.DB_HOST,
 user: process.env.DB_USER,
 password: process.env.DB_PASSWORD,
 database: process.env.DB_NAME,s
});

// Helper function to query the database
const queryDatabase = (query, params) => {
    return new Promise((resolve, reject) => {
        pool.query(query, params, (error, results) => {
            if (error) return reject(error);
            resolve(results);
        });
    });
};

// POST / - Add a new reminder
router.post('/', async (req, res) => {
    try {
        const { user_id, transactionDate, name, amount } = req.body;
        console.log(req.body);


        // Insert into the database
        const result = await queryDatabase(
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
        const reminders = await queryDatabase(
            'SELECT * FROM reminders WHERE user_id = ?',
            [user_id]
        );

        res.status(200).json(reminders);
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
        const results = await queryDatabase(
            'SELECT * FROM reminders WHERE user_id = ? AND created_at >= CURDATE() ORDER BY created_at ASC LIMIT 3',
            [user_id]
        );


        if (results.length === 0) {
            return res.status(404).json({ message: 'No upcoming transactions found' });
        }

        res.json(results);
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
        await queryDatabase('DELETE FROM reminders WHERE id = ?', [reminderId]);

        res.status(200).json({ message: 'Reminder deleted successfully.' });
    } catch (error) {
        console.error('Error deleting reminder:', error);
        res.status(500).json({ error: 'An error occurred while deleting the reminder.' });
    }
});


module.exports = router;
