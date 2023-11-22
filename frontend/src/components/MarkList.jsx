import React, { useState, useEffect } from "react";
import './MarkList.css';

const MarkList = () => {
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const baseURL = process.env.BASE_URL;

  useEffect(() => {
    fetch(`http://localhost:5000/api/students`)
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error("Error fetching students:", error));

    fetch(`http://localhost:5000/api/teachers`)
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error("Error fetching teachers:", error));
  }, [baseURL]);

  return (
    <div className="mark-list-container">
      <h1>Student Table</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Name</th>
            <th>Marks</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student._id}</td>
              <td>{student.name}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h1>Teacher Table</h1>

      <table className="data-table">
        <thead>
          <tr>
            <th>Teacher Name</th>
            <th>Subject</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.name}</td>
              <td>{teacher.subject}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarkList;
