const mongoose = require('mongoose');

const marksSchema = new mongoose.Schema({
  studentId: String,
  studentName : String,
  teacherName: String,
  subject: String,
  marks: Number,
});

module.exports = mongoose.model('Marks', marksSchema);
