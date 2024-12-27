const db = require("../config/postgres");

// Handler for creating a goal
module.exports.createGoal = async (req, res) => {
  const {
    user_id,
    goal_name,
    target_amount,
    current_savings,
    deadline,
    priority_level,
    notes,
  } = req.body;
  

  try {
    const result = await db`
      INSERT INTO goals 
      (user_id, goal_name, target_amount, current_savings, deadline, priority_level, notes)
      VALUES (${user_id}, ${goal_name}, ${target_amount}, ${current_savings}, ${deadline}, ${priority_level}, ${notes})
      RETURNING id
    `;
    res
      .status(201)
      .json({ message: "Goal created successfully!", goalId: result[0].id });
  } catch (err) {
    console.error("Error creating goal:", err);
    res.status(500).json({ error: "An error occurred while creating the goal." });
  }
};

// Handler for retrieving user goals
module.exports.getGoals = async (req, res) => {
  const userId = req.query.user_id;

  try {
    const results = await db`
      SELECT * FROM goals WHERE user_id = ${userId}
    `;
    if (results.length === 0) {
      return res.status(404).json({ message: "No goals found for this user." });
    }
    res.status(200).json(results);
  } catch (err) {
    console.error("Error fetching goals:", err);
    res.status(500).json({ error: "An error occurred while fetching the goals." });
  }
};

// Handler for deleting a goal
module.exports.deleteGoal = async (req, res) => {
  const goalId = req.params.goalId;

  try {
    const result = await db`
      DELETE FROM goals WHERE id = ${goalId}
    `;
    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Goal not found" });
    }
    res.status(200).json({ message: "Goal deleted successfully" });
  } catch (err) {
    console.error("Error deleting goal:", err);
    res.status(500).json({ error: "An error occurred while deleting the goal." });
  }
};
