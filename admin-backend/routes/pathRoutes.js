const express = require('express');
const router = express.Router();
const LearningPath = require('../models/LearningPath');
const Lesson = require('../models/Lesson');
const { authenticateAdmin } = require('./authRoutes');

// // Middleware to protect admin routes
// router.use(authenticateAdmin);

// Create a new Learning Path
router.post('/', async (req, res) => {
    try {
        const path = new LearningPath(req.body);
        await path.save();
        res.status(201).json(path);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all Learning Paths
router.get('/', async (req, res) => {
    try {
        const paths = await LearningPath.find();
        res.json(paths);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a Learning Path
router.put('/:id', async (req, res) => {
    try {
        const path = await LearningPath.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(path);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

const mongoose = require('mongoose');

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res
                .status(400)
                .json({ message: 'Invalid Learning Path ID' });
        }

        // Convert to ObjectId
        const pathId = new mongoose.Types.ObjectId(id);

        // Delete the Learning Path
        const path = await LearningPath.findByIdAndDelete(pathId);

        if (!path) {
            return res.status(404).json({ message: 'Learning Path not found' });
        }

        // Delete associated lessons
        const deletedLessons = await Lesson.deleteMany({ pathId });

        res.json({
            message: 'Learning Path and its lessons deleted successfully',
        });
    } catch (err) {
        console.error('Error deleting Learning Path:', err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
