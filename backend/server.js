require("dotenv").config("./.env");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes =require("./routes/authRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const searchtransactionRoutes = require("./routes/searchTransactionRoute");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());


app.use("/api",authRoutes);
app.use("/transactionapi",transactionRoutes );
app.use("/searchtransactionapi",searchtransactionRoutes); 


app.listen(process.env.PORT || 5000, function (req, res) {
  console.log(`Server is running on port ${process.env.PORT}`);
});
