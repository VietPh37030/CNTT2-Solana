const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');

// Define API routes
router.get('/login', authController.getLogin);
router.post('/login', authController.login);

module.exports = router;
