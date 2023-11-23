const Marks = require('../models/marksModel');

const getAllMarks = async (req, res) => {
  try {
    const marks = await Marks.find();
    res.json(marks);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const getMarksByStudentId = async (req, res) => {
  try {
    const marks = await Marks.find({ studentId: req.params.id });
    res.json(marks);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const createMarks = async (req, res) => {
  const marks = new Marks({
    studentId: req.body.studentId,
    studentName: req.body.studentName,
    teacherName: req.body.teacherName,
    subject: req.body.subject,
    marks: req.body.marks,
  });

  try {
    const savedMarks = await marks.save();
    res.json(savedMarks);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const updateMarks = async (req, res) => {
  try {
    const updatedMarks = await Marks.updateOne(
      { _id: req.params.id },
      {
        $set: {
          studentId: req.body.studentId,
          studentName : req.body.studentName,
          teacherName: req.body.teacherName,
          subject: req.body.subject,
          marks: req.body.marks,
        },
      }
    );
    res.json(updatedMarks);
  } catch (err) {
    res.json({ message: err.message });
  }
};

const deleteMarks = async (req, res) => {
  try {
    const removedMarks = await Marks.remove({ _id: req.params.id });
    res.json(removedMarks);
  } catch (err) {
    res.json({ message: err.message });
  }
};

module.exports = {
  getAllMarks,
  getMarksByStudentId,
  createMarks,
  updateMarks,
  deleteMarks,
};
