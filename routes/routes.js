const express = require('express');
const router = express.Router();
const authRoutes = require('./auth');

// Use the API routes
router.use('/api/v1', authRoutes);
router.use('/', function (req, res, next) {
    res.render('login', { title: 'LOGIN' });
});

module.exports = router;
