const express = require("express");
const router = express.Router();
const db = require("../config/postgres"); 
// Get transaction chart data (expenses vs income over time)
router.get("/transactions/chart-data", async (req, res) => {
    try {
      const expensesResult = await db`
        SELECT DATE(created_at) as date, SUM(amount) as total
        FROM transactions
        WHERE type = 'expense'
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
      `;
  
      const incomeResult = await db`
        SELECT DATE(created_at) as date, SUM(amount) as total
        FROM transactions
        WHERE type = 'income'
        GROUP BY DATE(created_at)
        ORDER BY DATE(created_at)
      `;
  
      const labels = Array.from(
        new Set([
          ...expensesResult.map((row) => row.date),
          ...incomeResult.map((row) => row.date),
        ])
      ).sort();
  
      const expenseData = labels.map((label) => {
        const item = expensesResult.find((row) => row.date === label);
        return item ? item.total : 0;
      });
  
      const incomeData = labels.map((label) => {
        const item = incomeResult.find((row) => row.date === label);
        return item ? item.total : 0;
      });
  
      res.json({ labels, expenses: expenseData, income: incomeData });
    } catch (error) {
      console.error("Error fetching chart data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // Delete a transaction by ID

  // Filter Transactions
  router.get("/transactions/filter", async (req, res) => {
    const { user_id, category, type } = req.query;
    if (!user_id || !category || !type) {
      return res.status(400).send("Missing required query parameters: user_id, category, or type.");
    }
  
    try {
      const result = await db
        `SELECT * FROM transactions WHERE user_id = ${user_id} AND category = ${category} AND type = ${type} ORDER BY date DESC`;
      res.json(result.rows);
    } catch (error) {
      console.error("Error fetching filtered transactions:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Export Transactions as CSV
  router.get("/transactions/export/csv", async (req, res) => {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).send("Missing required query parameter: user_id.");
    }
  
    try {
      const result = await db
        `SELECT created_at, category, amount, type FROM transactions WHERE user_id = ${user_id}`;
  
      const csv = parse(result.rows);
      const timestamp = Date.now();
      const filePath = path.join(__dirname, `../exports/transactions_${timestamp}.csv`);
      fs.writeFileSync(filePath, csv);
  
      res.download(filePath, (err) => {
        if (err) console.error("Error sending file:", err);
        fs.unlinkSync(filePath); // Clean up file
      });
    } catch (error) {
      console.error("Error exporting transactions as CSV:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Export Transactions as PDF
  router.get("/transactions/export/pdf", async (req, res) => {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).send("Missing required query parameter: user_id.");
    }
  
    try {
      const result = await db
        `SELECT created_at, category, amount, type FROM transactions WHERE user_id = ${user_id}`;
      const doc = new PDFDocument();
      const timestamp = Date.now();
      const filePath = path.join(__dirname, `../exports/transactions_${timestamp}.pdf`);
      doc.pipe(fs.createWriteStream(filePath));
  
      doc.fontSize(18).text("Transaction Report", { align: "center" });
      doc.moveDown();
  
      result.rows.forEach((row) => {
        doc.fontSize(12).text(`Date: ${row.date}, Category: ${row.category}, Amount: ₹${row.amount}, Type: ${row.type}`);
      });
  
      doc.end();
  
      res.download(filePath, (err) => {
        if (err) console.error("Error sending file:", err);
        fs.unlinkSync(filePath); // Clean up file
      });
    } catch (error) {
      console.error("Error exporting transactions as PDF:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  
  // Fetch Detailed Report
  router.get("/transactions/report", async (req, res) => {
    const { user_id } = req.query;
    if (!user_id) {
      return res.status(400).send("Missing required query parameter: user_id.");
    }
  
    try {
      const result = await db
        `SELECT created_at, category, SUM(amount) as amount FROM transactions WHERE user_id = ${user_id} GROUP BY created_at, category ORDER BY date DESC`;
      res.json(result);
    } catch (error) {
      console.error("Error fetching detailed reports:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  module.exports = router;
