import React, { useState, useEffect } from 'react';
import './Student.css';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({ name: '', age: '', grade: '' });
  const [editingStudent, setEditingStudent] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/students')
      .then((res) => res.json())
      .then((data) => setStudents(data))
      .catch((error) => console.error('Error fetching students:', error));
  }, []);

  const handleInputChange = (e) => {
    if (editingStudent) {
      setEditingStudent({ ...editingStudent, [e.target.name]: e.target.value });
    } else {
      setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
    }
  };

  const handleAddStudent = () => {
    if (editingStudent) {
      fetch(`http://localhost:5000/api/students/${editingStudent._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editingStudent),
      })
        .then((res) => res.json())
        .then((updatedStudent) => {
          setStudents(students.map((student) => (student._id === updatedStudent._id ? updatedStudent : student)));
          setEditingStudent(null);
        })
        .catch((error) => console.error('Error updating student:', error));
    } else {
      fetch('http://localhost:5000/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newStudent),
      })
        .then((res) => res.json())
        .then((data) => {
          setStudents([...students, data]);
          setNewStudent({ name: '', age: '', grade: '' });
        })
        .catch((error) => console.error('Error adding student:', error));
    }
  };

  const handleDeleteStudent = (id) => {
    fetch(`http://localhost:5000/api/students/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setStudents(students.filter((student) => student._id !== id));
      })
      .catch((error) => console.error('Error deleting student:', error));
  };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setNewStudent({ name: student.name, age: student.age, grade: student.grade });
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
    setNewStudent({ name: '', age: '', grade: '' });
  };

  return (
    <div className="student-container">
      <h2>Students</h2>
      <div className="student-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={editingStudent ? editingStudent.name : newStudent.name}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={editingStudent ? editingStudent.age : newStudent.age}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="grade"
          placeholder="Marks"
          value={editingStudent ? editingStudent.grade : newStudent.grade}
          onChange={handleInputChange}
        />
        {editingStudent ? (
          <div className="button-group">
            <button onClick={handleAddStudent} className='update'>Update Student</button>
            <button onClick={handleCancelEdit} className='cancel'>Cancel</button>
          </div>
        ) : (
          <button onClick={handleAddStudent} className='add'>Add Student</button>
        )}
      </div>
      <table className="student-list">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.grade}</td>
              <td>
                <button onClick={() => handleDeleteStudent(student._id)} className='delete'>Delete</button>
                <button onClick={() => handleEditStudent(student)} className='edit'>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;
