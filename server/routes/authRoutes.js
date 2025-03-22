const express = require('express');
const router = express.Router();

// impor fungsi register dan login dari authController
const { register, login } = require('../controllers/authController');

// menggunakan metode POST karena data dikirim melalui request body
router.post('/register', register);
router.post('/login', login);

module.exports = router;
