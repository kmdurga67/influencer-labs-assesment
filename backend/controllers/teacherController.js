const Teacher = require('../models/teacherModel');

const getAllTeachers = async (req, res) => {
  try {
    const teachers = await Teacher.find();
    res.json(teachers);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const getTeacherById = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);
    res.json(teacher);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const createTeacher = async (req, res) => {
  const teacher = new Teacher({
    name: req.body.name,
    subject: req.body.subject,
  });

  try {
    const savedTeacher = await teacher.save();
    res.json(savedTeacher);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const updateTeacher = async (req, res) => {
  try {
    const updatedTeacher = await Teacher.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          subject: req.body.subject,
        },
      }
    );
    res.json(updatedTeacher);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const deleteTeacher = async (req, res) => {
  try {
    const removedTeacher = await Teacher.remove({ _id: req.params.id });
    res.json(removedTeacher);
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher,
};
