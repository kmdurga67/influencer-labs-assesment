const express = require('express');
const router = express.Router();
const marksController = require('../controllers/marksController');

// Get all marks
router.get('/', marksController.getAllMarks);

// Get marks for a specific student
router.get('/student/:id', marksController.getMarksByStudentId);

// Create new marks
router.post('/', marksController.createMarks);

// Update marks
router.put('/:id', marksController.updateMarks);

// Delete marks
router.delete('/:id', marksController.deleteMarks);

module.exports = router;
