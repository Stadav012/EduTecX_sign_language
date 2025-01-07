const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(bodyParser.json());

const cors = require('cors');

// Enable CORS for all routes
app.use(cors());

// Or configure CORS to allow specific origin
app.use(
    cors({
        origin: 'http://localhost:5173', // Your frontend URL
        methods: 'GET,POST,PUT,DELETE',
        allowedHeaders: 'Content-Type,Authorization',
    })
);

// Connect to MongoDB
mongoose
    .connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('MongoDB connection error: ', err));

// Routes

app.use('/api/auth', authRoutes.router);
app.use('/api/paths', require('./routes/pathRoutes'));
app.use('/api/lessons', require('./routes/lessonRoutes'));

// Export app for testing purposes
// module.exports = app;

// // Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
