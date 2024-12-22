const db = require("../config/postgres");

module.exports.createGoal = async (req, res) => {
  const { user_id, goal_name, target_amount, current_savings, deadline, priority_level, notes } = req.body;

  const query = `
    INSERT INTO goals (user_id, goal_name, target_amount, current_savings, deadline, priority_level, notes)
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id
  `;

  try {
    const result = await db.query(query, [
      user_id, goal_name, target_amount, current_savings, deadline, priority_level, notes
    ]);
    res.status(201).json({ message: "Goal created successfully!", goalId: result.rows[0].id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handler for retrieving user goals
module.exports.getGoals = async (req, res) => {
  const userId = req.query.user_id;

  const query = 'SELECT * FROM goals WHERE user_id = $1';

  try {
    const results = await db.query(query, [userId]);
    res.status(200).json(results.rows);  // Corrected to access rows property
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Handler for deleting a goal
module.exports.deleteGoal = async (req, res) => {
    const goalId = req.params.goalId;
  
    const query = 'DELETE FROM goals WHERE id = $1';
  
    try {
      const result = await db.query(query, [goalId]);
      if (result.rowCount === 0) {
        return res.status(404).json({ error: "Goal not found" });
      }
      res.status(200).json({ message: "Goal deleted successfully" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  