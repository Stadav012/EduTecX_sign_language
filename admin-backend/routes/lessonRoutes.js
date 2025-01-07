const express = require('express');
const router = express.Router();
const Lesson = require('../models/Lesson');
const LearningPath = require('../models/LearningPath');

const mongoose = require('mongoose');

router.post('/', async (req, res) => {
    try {
        // Ensure pathId is a valid ObjectId
        const pathId = new mongoose.Types.ObjectId(req.body.pathId);

        // Check if the LearningPath exists
        const pathExists = await LearningPath.findById(pathId);
        if (!pathExists) {
            return res.status(400).json({ message: 'Path not found' });
        }

        const lesson = new Lesson(req.body);
        await lesson.save();
        res.status(201).json(lesson);
    } catch (err) {
        console.error(err); // Log error for more details
        res.status(400).json({ message: err.message });
    }
});

// Get all Lessons for a specific path
router.get('/:pathId', async (req, res) => {
    try {
        const lessons = await Lesson.find({ pathId: req.params.pathId });
        res.json(lessons);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a Lesson
router.put('/:id', async (req, res) => {
    try {
        const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.json(lesson);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a Lesson
router.delete('/:id', async (req, res) => {
    try {
        await Lesson.findByIdAndDelete(req.params.id);
        res.json({ message: 'Lesson deleted successfully' });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
