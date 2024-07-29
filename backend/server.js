require("dotenv").config("./.env");
const express = require("express");
const connectDB = require("./config/Mongoose-connection");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes =require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

connectDB();

app.use("/api",authRoutes);
app.use("/transactionapi",transactionRoutes );


app.listen(process.env.PORT || 5000, function (req, res) {
  console.log(`Server is running on port ${process.env.PORT}`);
});
