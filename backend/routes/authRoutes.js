const express = require('express');
const { register ,login} = require('../Controller/userController');

const router = express.Router();

router.get('/', (req, res) => res.send('Hello from the server'));
router.post('/register', register);
router.post('/login', login);

module.exports = router;
