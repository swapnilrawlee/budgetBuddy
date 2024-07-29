const userModel = require("../modules/userModel");

const bcrypt = require("bcrypt");

module.exports.signIn = async function (req, res) {
  try {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email  || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // Check if user already exists
    let user = await userModel.findOne({ email });
    if (user) return res.status(400).send({ msg: "User already exists" });

    // Hash password and create user
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    user = await userModel.create({
      name,
      email,
      password: hash,
       
    });

    res.status(200).send({user});
    console.log(`User created successfully`);
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

module.exports.login = async function (req, res) {
  const { email, password } = req.body;

  try {
    // Validate input
    if (!email || !password ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    let  user = await userModel.findOne({ email });
     

    if (!user) {
      return res.status(401).send({ message: "Invalid loginId or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: "Invalid loginId or password" });
    }

    res.status(200).send(`${user.name}`);
    console.log(`User logged in successfully ${user.name}`);
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send({ message: "Internal server error" });
  }
};

// module.exports.users = async function (req, res) {
//   try {
//     const { user } = req.params; // Extract user identifier
//     let foundUser;

//     // Assuming you are able to query users regardless of role
//     foundUser = await userModel.findOne({ name: user }) ||
//                 await studentModels.findOne({ name: user }) ||
//                 await teacherModels.findOne({ name: user });

//     if (foundUser) {
//       res.status(200).send(foundUser);
//     } else {
//       res.status(404).send({ message: "User not found" });
//     }
//   } catch (error) {
//     console.error("Error during data fetch:", error);
//     res.status(500).send({ message: "Internal server error" });
//   }
// };
