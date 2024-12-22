require("dotenv").config();
const bcrypt = require("bcryptjs");

const db = require("../config/postgres")
// Register function
module.exports.register = async function (req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Check if the email already exists in the database
    const result = await db`SELECT * FROM users WHERE email = ${email}`;

    if (result.length > 0) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    await db`INSERT INTO users ("name", "email", "password") VALUES (${name}, ${email}, ${hashedPassword})`;

    console.log("User registered successfully");
    res.status(200).json({ msg: "User registered successfully" });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};

// Login function
module.exports.login = async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ msg: "All fields are required" });
  }

  try {
    // Find the user by email
    const result = await db`SELECT * FROM users WHERE email = ${email}`;

    if (result.length === 0) {
      return res.status(400).json({ msg: "Invalid email or password" });
    }

    const user = result[0];

    // Compare the provided password with the hashed password stored in the database
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      console.log("User logged in successfully");
      res.status(200).json({ msg: "Login successful", user: user });
    } else {
      return res.status(400).json({ msg: "Invalid email or password" });
    }
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
