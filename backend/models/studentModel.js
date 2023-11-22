const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
  grade: Number,
});

module.exports = mongoose.model('Student', studentSchema);
