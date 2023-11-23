import React, { useState, useEffect } from 'react';
import './MarkList.css';

const MarkList = () => {
  const [marks, setMarks] = useState([]);
  const [newMark, setNewMark] = useState({
    studentId: '',
    studentName: '',
    teacherName: '',
    subject: '',
    marks: '',
  });
  const [editingMarkId, setEditingMarkId] = useState(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/marks')
      .then((res) => res.json())
      .then((data) => setMarks(data))
      .catch((error) => console.error('Error fetching marks:', error));
  }, []);

  const handleInputChange = (e) => {
    setNewMark({ ...newMark, [e.target.name]: e.target.value });
  };

  const handleAddMark = () => {
    if (editingMarkId) {
      fetch(`http://localhost:5000/api/marks/${editingMarkId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMark),
      })
        .then((res) => res.json())
        .then((updatedMark) => {
          setMarks((prevMarks) =>
            prevMarks.map((prevMark) =>
              prevMark._id === updatedMark._id ? updatedMark : prevMark
            )
          );
          setEditingMarkId(null);
          setNewMark({
            studentId: '',
            studentName: '',
            teacherName: '',
            subject: '',
            marks: '',
          });
        })
        .catch((error) => console.error('Error updating mark:', error));
    } else {
      fetch('http://localhost:5000/api/marks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMark),
      })
        .then((res) => res.json())
        .then((data) => {
          setMarks([...marks, data]);
          setNewMark({
            studentId: '',
            studentName: '',
            teacherName: '',
            subject: '',
            marks: '',
          });
        })
        .catch((error) => console.error('Error adding mark:', error));
    }
  };

  const handleDeleteMark = (id) => {
    fetch(`http://localhost:5000/api/marks/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setMarks(marks.filter((mark) => mark._id !== id));
      })
      .catch((error) => console.error('Error deleting mark:', error));
  };

  const handleEditMark = (mark) => {
    setEditingMarkId(mark._id);
    setNewMark({
      studentId: mark.studentId,
      studentName: mark.studentName,
      teacherName: mark.teacherName,
      subject: mark.subject,
      marks: mark.marks,
    });
  };

  const handleCancelEdit = () => {
    setEditingMarkId(null);
    setNewMark({
      studentId: '',
      studentName: '',
      teacherName: '',
      subject: '',
      marks: '',
    });
  };

  return (
    <div className="marks-container">
      <h2>Marks</h2>
      <div className="marks-form">
        <input
          type="text"
          name="studentId"
          placeholder="Student ID"
          value={newMark.studentId}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="studentName"
          placeholder="Student Name"
          value={newMark.studentName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="teacherName"
          placeholder="Teacher Name"
          value={newMark.teacherName}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newMark.subject}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="marks"
          placeholder="Marks"
          value={newMark.marks}
          onChange={handleInputChange}
        />
        {editingMarkId ? (
          <>
            <button onClick={handleAddMark}>Update Mark</button>
            <button onClick={handleCancelEdit}>Cancel</button>
          </>
        ) : (
          <button onClick={handleAddMark} className="add">
            Add Mark
          </button>
        )}
      </div>
      <table className="marks-list">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Student Name</th>
            <th>Teacher Name</th>
            <th>Subject</th>
            <th>Marks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {marks.map((mark) => (
            <tr key={mark._id}>
              <td>{mark.studentId}</td>
              <td>{mark.studentName}</td>
              <td>{mark.teacherName}</td>
              <td>{mark.subject}</td>
              <td>{mark.marks}</td>
              <td>
                <button
                  onClick={() => handleEditMark(mark)}
                  className="edit"
                  disabled={editingMarkId !== null}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteMark(mark._id)}
                  className="delete"
                  disabled={editingMarkId !== null}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MarkList;
