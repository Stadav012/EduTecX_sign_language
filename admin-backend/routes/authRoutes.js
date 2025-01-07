const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt'); // For password hashing (if needed)
const router = express.Router();

const ADMIN_CREDENTIALS = {
    username: 'Trueman',
    password: '$2b$10$IvVZ0exceccCG0lPR3D4ZexsOMHblxlvkMHoDBYNeWnGLRFMMaCFy', // bcrypt hash for "password123"
};

const SECRET_KEY = 'your_secret_key'; // Replace with an environment variable

// Admin login route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    // const bcrypt = require('bcrypt');
    // bcrypt.hash('password123', 10, (err, hash) => {
    //     if (err) throw err;
    //     console.log('Hashed password:', hash);
    // });

    if (username !== ADMIN_CREDENTIALS.username) {
        return res
            .status(401)
            .json({ message: 'Invalid username or password' });
    }

    const isValidPassword = await bcrypt.compare(
        password,
        ADMIN_CREDENTIALS.password
    );
    if (!isValidPassword) {
        return res
            .status(401)
            .json({ message: 'Invalid username or password' });
    }

    // Generate JWT
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    res.json({ token });
});

// Middleware to protect admin routes
const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(403).json({ message: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        req.admin = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Unauthorized' });
    }
};

module.exports = {
    router,
    authenticateAdmin,
};
