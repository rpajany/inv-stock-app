const express = require('express');
const { register, login, logout } = require('../controller/Auth_Controller');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/logout', logout);


module.exports = router;