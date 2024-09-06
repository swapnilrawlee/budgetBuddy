const mysql2 = require('mysql2');
const bcrypt = require('bcryptjs');

// Database connection (ensure this is set up properly in your project)
const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'budgetbuddy'
});

module.exports.register = async function (req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ msg: 'All fields are required' });
    } else {
        db.query('SELECT * FROM users WHERE email =?', [email], async (err, result) => {
            if (err) throw err;
            if (result.length > 0) {
                return res.status(400).json({ msg: 'Email already exists' });
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                
                db.query('INSERT INTO users (name, email, password) VALUES (?,?,?)', [name, email, hashedPassword], (err, result) => {
                    if (err) throw err;
                    console.log('User registered successfully.');
                    res.status(200).json({ msg: 'User registered successfully' ,user:user });
                });
            }
        });
    }
};

module.exports.login = function (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'All fields are required' });
    } else {
        db.query('SELECT * FROM users WHERE email =?', [email], async (err, result) => {
            if (err) throw err;
            if (result.length === 0) {
                return res.status(400).json({ msg: 'Invalid email or password' });
            } else {
                const user = result[0];
                
                // Compare the provided password with the hashed password
                const isMatch = await bcrypt.compare(password, user.password);
                
                if (isMatch) {
                    console.log('User logged in successfully.');
                    res.status(200).json({ msg: 'Login successful' , user:user });
                } else {
                    return res.status(400).json({ msg: 'Invalid email or password' });
                }
            }
        });
    }
};