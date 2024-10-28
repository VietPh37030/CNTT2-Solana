const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Render login page
router.get('/login', authController.getLogin);

// Handle login form submission
router.post('/login', authController.login);

module.exports = router;
