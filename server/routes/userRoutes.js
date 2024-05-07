// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controller/userController.js');

// Signup route
router.post('/signup', userController.signup);

// Login route
router.post('/login', userController.login);

// Logout route
router.post('/logout', userController.logout);

module.exports = router;
