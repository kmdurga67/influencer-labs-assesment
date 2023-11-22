const Student = require('../models/studentModel');

const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    res.json(student);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const createStudent = async (req, res) => {
  const student = new Student({
    name: req.body.name,
    age: req.body.age,
    grade: req.body.grade,
  });

  try {
    const savedStudent = await student.save();
    res.json(savedStudent);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const updateStudent = async (req, res) => {
  try {
    const updatedStudent = await Student.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          age: req.body.age,
          grade: req.body.grade,
        },
      }
    );
    res.json(updatedStudent);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const removedStudent = await Student.remove({ _id: req.params.id });
    res.json(removedStudent);
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = {
  getAllStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
