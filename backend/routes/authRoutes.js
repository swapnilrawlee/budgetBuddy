const express = require('express');
const { signIn ,login} = require('../Controller/userController');

const router = express.Router();

router.get('/', (req, res) => res.send('Hello from the server'));
router.post('/register', signIn);
router.post('/login', login);

module.exports = router;
