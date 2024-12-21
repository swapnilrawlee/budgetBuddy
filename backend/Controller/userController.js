require("dotenv").config();
const mysql2 = require("mysql2");
const postgres = require("postgres");
const bcrypt = require("bcryptjs");

// Database connection (ensure this is set up properly in your project)
// const db = mysql2.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '123456',
//     database: 'budgetbuddy'
// });

// const db = mysql2.createConnection({

//  host: process.env.DB_HOST,
//  user: process.env.DB_USER,
//  password: process.env.DB_PASSWORD,
//  database: process.env.DB_NAME,
// });

const db = postgres(process.env.DATABASE_URL, {
  host: process.env.host,
  port: process.env.db_port,
  database: process.env.database,
  user: process.env.user,
  pool_mode: process.env.pool_mode,
});


module.exports.register = async function (req, res) {
  const { name, email, password } = req.body;

try {
    await db`INSERT INTO users ("name", "email", "password") Values (${name},${email},${password}) `
    console.log("successful")
       res.send("successful");
         
} catch (error) {
 console.log("error",error)   
}
  }
// module.exports.register = async function (req, res) {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password) {
//     return res.status(400).json({ msg: "All fields are required" });
//   } else {
//     db.query(
//       "SELECT * FROM users WHERE email =?",
//       [email],
//       async (err, result) => {
//         if (err) throw err;
//         if (result.length > 0) {
//           return res.status(400).json({ msg: "Email already exists" });
//         } else {
//           const hashedPassword = await bcrypt.hash(password, 10);

//           db.query(
//             "INSERT INTO users (name, email, password) VALUES (?,?,?)",
//             [name, email, hashedPassword],
//             (err, result) => {
//               if (err) throw err;
//               console.log("User registered successfully.");
//               res
//                 .status(200)
//                 .json({ msg: "User registered successfully", user: user });
//             }
//           );
//         }
//       }
//     );
//   }
// };


// module.exports.login = function (req, res) {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return res.status(400).json({ msg: "All fields are required" });
//   } else {
//     db.query(
//       "SELECT * FROM users WHERE email =?",
//       [email],
//       async (err, result) => {
//         if (err) throw err;
//         if (result.length === 0) {
//           return res.status(400).json({ msg: "Invalid email or password" });
//         } else {
//           const user = result[0];

//           // Compare the provided password with the hashed password
//           const isMatch = await bcrypt.compare(password, user.password);

//           if (isMatch) {
//             console.log("User logged in successfully.");
//             res.status(200).json({ msg: "Login successful", user: user });
//           } else {
//             return res.status(400).json({ msg: "Invalid email or password" });
//           }
//         }
//       }
//     );
//   }
// };
