const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.getLogin = (req, res) => {
    res.render('login', { title: 'Login' });
};

exports.login = async (req, res) => {
    

    try {
        const { username, password } = req.body;
    console.log(username, password); // Debugging purposes only. Remove before production.
        const user = await User.find({ username: username, password: password });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, process.env.SECRETKEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful', token, user: user });
        
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
        console.log(error);
    }
};