require("dotenv").config("./.env");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalsRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const transactionReminderRoutes = require("./routes/transactionReminderRoutes");
const searchtransactionRoutes = require("./routes/searchTransactionRoute");
const ReportRoutes = require("./routes/ReportRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Configure CORS
const corsOptions = {
  origin: 'http://localhost:5173' || "https://budget-buddy-omega.vercel.app/", // Allow requests from localhost:5173
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods (optional)
  credentials: true, // Include cookies in requests (if needed)
};

// Use CORS middleware
app.use(cors(corsOptions));
app.use(cookieParser());


app.use("/api", authRoutes);
app.use("/transactionapi", transactionRoutes);
app.use("/searchtransactionapi", searchtransactionRoutes);
app.use("/goals", goalRoutes);
app.use("/reminders", transactionReminderRoutes);
app.use("/report", ReportRoutes);


app.listen(process.env.PORT || 5000, function (req, res) {
  console.log(`Server is running on port ${process.env.PORT}`);
});
