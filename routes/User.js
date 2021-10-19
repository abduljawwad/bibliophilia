const express = require('express');
const router = express.Router();
const User = require('../controllers/User')

// mongoDB user model
const Users = require('./../models/User')

// bcrypt library
const bcrypt = require('bcrypt')

// signup
router.post("/signup", User.signup);

// signin
router.post("/login", User.signin);

module.exports = router;