const express = require('express');
const router = express.Router();
const Teacher = require('../models/teacherModel');
const teacherController = require('../controllers/teacherController');

router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', teacherController.getAllTeachers);

router.get('/:id', teacherController.getTeacherById);

router.post('/', teacherController.createTeacher);

router.put('/:id', teacherController.updateTeacher);

router.delete('/:id', teacherController.deleteTeacher);

module.exports = router;

