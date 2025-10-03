const express = require("express");
const router = express.Router();
const db = require("../config/database");
const fs = require("fs");
const path = require("path");
const { parse } = require("json2csv");
const PDFDocument = require("pdfkit");

// Get transaction chart data (expenses vs income over time)
router.get("/transactions/chart-data", async (req, res) => {
  try {
    const [expensesResult] = await db.query(
      "SELECT DATE(created_at) as date, SUM(amount) as total FROM transactions WHERE type = ? GROUP BY DATE(created_at) ORDER BY DATE(created_at)",
      ["expense"]
    );

    const [incomeResult] = await db.query(
      "SELECT DATE(created_at) as date, SUM(amount) as total FROM transactions WHERE type = ? GROUP BY DATE(created_at) ORDER BY DATE(created_at)",
      ["income"]
    );

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

// Filter Transactions
router.get("/transactions/filter", async (req, res) => {
  const { user_id, category, type } = req.query;
  if (!user_id || !category || !type) {
    return res.status(400).send("Missing required query parameters: user_id, category, or type.");
  }

  try {
    const [result] = await db.query(
      "SELECT * FROM transactions WHERE user_id = ? AND category = ? AND type = ? ORDER BY created_at DESC",
      [user_id, category, type]
    );
    res.json(result);
  } catch (error) {
    console.error("Error fetching filtered transactions:", error);
    res.status(500).send("Internal Server Error");
  }
});

const exportsDir = path.join(__dirname, "../exports");

// Ensure the exports directory exists
if (!fs.existsSync(exportsDir)) {
  fs.mkdirSync(exportsDir, { recursive: true });
}

// Export Transactions as CSV
router.get("/transactions/export/csv", async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) {
    return res.status(400).send("Missing required query parameter: user_id.");
  }

  try {
    const [result] = await db.query(
      "SELECT created_at, category, amount, type FROM transactions WHERE user_id = ?",
      [user_id]
    );

    const csv = parse(result);
    const timestamp = Date.now();
    const filePath = path.join(__dirname, `../exports/transactions_${timestamp}.csv`);
    fs.writeFileSync(filePath, csv);

    res.download(filePath, (err) => {
      if (err) {
        console.error("Error sending file:", err);
      }
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

  const filePath = path.join(__dirname, `../exports/transactions_${Date.now()}.pdf`);

  try {
    // Fetch transaction data
    const [result] = await db.query(
      "SELECT created_at, category, amount, type FROM transactions WHERE user_id = ?",
      [user_id]
    );

    if (!result || result.length === 0) {
      return res.status(404).send("No transactions found for the given user.");
    }

    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream(filePath);

    // Log for debugging
    console.log("Starting to write PDF");

    doc.pipe(writeStream);

    doc.fontSize(18).text("Transaction Report", { align: "center" });
    doc.moveDown();

    result.forEach((row) => {
      const formattedDate = new Date(row.created_at).toLocaleDateString('en-GB'); // 'en-GB' for DD/MM/YYYY format
      doc.fontSize(12).text(`Date: ${formattedDate}, Category: ${row.category}, Amount: ₹${row.amount}, Type: ${row.type}`);
    });

    doc.end();

    writeStream.on('finish', () => {
      console.log("PDF generated successfully, starting download...");
      res.download(filePath, (err) => {
        if (err) {
          console.error("Error sending file:", err);
        }
        fs.unlinkSync(filePath); // Clean up file
      });
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
    const [result] = await db.query(
      "SELECT created_at, category, SUM(amount) as amount FROM transactions WHERE user_id = ? GROUP BY created_at, category ORDER BY created_at DESC",
      [user_id]
    );
    console.log(result);
    res.json(result);
  } catch (error) {
    console.error("Error fetching detailed reports:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;