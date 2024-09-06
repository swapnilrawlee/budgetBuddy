const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'budgetbuddy',
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});

// Handler for creating a new goal
const createGoal = (req, res) => {
    const { user_id, goal_name, target_amount, current_savings, deadline, priority_level, notes } = req.body;
    
    const query = `
      INSERT INTO goals (user_id, goal_name, target_amount, current_savings, deadline, priority_level, notes)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    connection.query(query, [user_id, goal_name, target_amount, current_savings, deadline, priority_level, notes], (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Goal created successfully!', goalId: results.insertId });
    });
  };
  
const getGoals = (req, res) => {
  const userId = req.query.user_id;

  const query = 'SELECT * FROM goals WHERE user_id = ?';
  connection.query(query, [userId], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
};
const deleteGoals = (req, res) => {
    const goalId = req.params.goalId;
  
    // SQL query to delete the goal by ID
    const query = 'DELETE FROM goals WHERE id = ?';
  
    connection.query(query, [goalId], (err, results) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({ error: 'Goal not found' });
      }
      res.status(200).json({ message: 'Goal deleted successfully' });
    });
  };
  


module.exports ={createGoal,getGoals,deleteGoals}
