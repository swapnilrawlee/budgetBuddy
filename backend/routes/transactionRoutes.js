const express = require("express");
const router = express.Router();
const db = require("../config/database");

// Get all transactions for a specific user
router.get("/transactions", async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: "User ID is required." });
  }

  try {
    const [result] = await db.query(
      "SELECT * FROM transactions WHERE user_id = ?",
      [user_id]
    );
    console.log(result);
    res.send(result);
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).send({ error: "Error fetching transactions." });
  }
});

// Delete a transaction by ID
router.delete("/transactions/:id", async (req, res) => {
  const { id } = req.params;
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: "User ID is required." });
  }

  try {
    const [checkResult] = await db.query(
      "SELECT * FROM transactions WHERE id = ? AND user_id = ?",
      [id, user_id]
    );

    if (checkResult.length === 0) {
      return res
        .status(404)
        .send({ error: "Transaction not found or unauthorized." });
    }

    await db.query(
      "DELETE FROM transactions WHERE id = ? AND user_id = ?",
      [id, user_id]
    );
    res.send({ message: "Transaction deleted" });
  } catch (error) {
    console.error("Error deleting transaction:", error);
    res.status(500).send({ error: "Error deleting transaction." });
  }
});

// Get the 3 most recent transactions for a specific user
router.get("/recenttransactions", async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: "User ID is required." });
  }

  try {
    const [result] = await db.query(
      "SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 3",
      [user_id]
    );
    res.send(result);
  } catch (error) {
    console.error("Error fetching recent transactions:", error);
    res.status(500).send({ error: "Error fetching recent transactions." });
  }
});

// Get summary of income and expenses for a user
router.get("/transactions/summary", async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: "User ID is required." });
  }

  try {
    const [result] = await db.query(
      "SELECT SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income, " +
      "SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expenses " +
      "FROM transactions WHERE user_id = ?",
      [user_id]
    );
    res.send(result[0]);
  } catch (error) {
    console.error("Error calculating totals:", error);
    res.status(500).send({ error: "Error calculating totals." });
  }
});

// Get total transaction amount for a user
router.get("/transactions/total", async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: "User ID is required." });
  }

  try {
    const [result] = await db.query(
      "SELECT SUM(amount) AS total FROM transactions WHERE user_id = ?",
      [user_id]
    );

    if (result[0].total !== null) {
      res.send(result[0]);
    } else {
      res
        .status(404)
        .send({ error: "No transactions found for the given user." });
    }
  } catch (error) {
    console.error("Error calculating total amount:", error);
    res.status(500).send({ error: "Error calculating total amount." });
  }
});

// Get net balance for a user (income - expenses)
router.get("/transactions/net-balance", async (req, res) => {
  const user_id = req.query.user_id;

  if (!user_id) {
    return res.status(400).send({ error: "User ID is required." });
  }

  try {
    const [result] = await db.query(
      "SELECT SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - " +
      "SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS net_balance " +
      "FROM transactions WHERE user_id = ?",
      [user_id]
    );

    if (result[0].net_balance !== null) {
      res.send(result[0]);
    } else {
      res
        .status(404)
        .send({ error: "No transactions found for the given user." });
    }
  } catch (error) {
    console.error("Error calculating net balance:", error);
    res.status(500).send({ error: "Error calculating net balance." });
  }
});

// Add a new transaction
router.post("/transactions", async (req, res) => {
  const { category, amount, type, user_id } = req.body;

  if (
    !category ||
    isNaN(amount) ||
    amount <= 0 ||
    !["income", "expense"].includes(type) ||
    !user_id
  ) {
    return res.status(400).send({ error: "Invalid input data." });
  }

  try {
    const [result] = await db.query(
      "INSERT INTO transactions (category, amount, type, user_id) VALUES (?, ?, ?, ?)",
      [category, amount, type, user_id]
    );

    const newTransaction = {
      id: result.insertId,
      category,
      amount,
      type,
      user_id,
    };

    res.send(newTransaction);
  } catch (error) {
    console.error("Error adding transaction:", error);
    res
      .status(500)
      .send({ error: "Error adding transaction.", details: error.message });
  }
});

module.exports = router;