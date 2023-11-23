const express = require('express');
const mongoose = require('mongoose');
const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const marksRoutes = require('./routes/marksRoutes');
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 5000;

mongoose.connect('mongodb+srv://singhdurga5698:singhdurga@cluster0.f7hyf4h.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());

app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/marks', marksRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
