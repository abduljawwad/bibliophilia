const express = require('express');
const router = express.Router();
const User = require('../controllers/User')

// signup
router.post("/signup", User.signup);

// signin
router.post("/login", User.signin);

module.exports = router;