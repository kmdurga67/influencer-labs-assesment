import React, { useState, useEffect } from "react";
import "./TeacherList.css";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [newTeacher, setNewTeacher] = useState({ name: "", subject: "" });
  const [editingTeacherId, setEditingTeacherId] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/teachers")
      .then((res) => res.json())
      .then((data) => setTeachers(data))
      .catch((error) => console.error("Error fetching teachers:", error));
  }, []);

  const handleInputChange = (e) => {
    setNewTeacher({ ...newTeacher, [e.target.name]: e.target.value });
  };

  const handleAddTeacher = () => {
    fetch("http://localhost:5000/api/teachers", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTeacher),
    })
      .then((res) => res.json())
      .then((data) => {
        setTeachers([...teachers, data]);
        setNewTeacher({ name: "", subject: "" });
      })
      .catch((error) => console.error("Error adding teacher:", error));
  };

  const handleDeleteTeacher = (id) => {
    fetch(`http://localhost:5000/api/teachers/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        setTeachers(teachers.filter((teacher) => teacher._id !== id));
      })
      .catch((error) => console.error("Error deleting teacher:", error));
  };

  const handleUpdateTeacher = (teacher) => {
    setEditingTeacherId(teacher._id);
    setNewTeacher({ name: teacher.name, subject: teacher.subject });
    handleSaveUpdate(teacher._id);
  };

  const handleSaveUpdate = (id, callback) => {
    setNewTeacher((prevTeacher) => ({ ...prevTeacher }));
    fetch(`http://localhost:5000/api/teachers/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTeacher),
    })
      .then((res) => res.json())
      .then((data) => {
        setTeachers((prevTeachers) =>
          prevTeachers.map((prevTeacher) =>
            prevTeacher._id === id ? { ...prevTeacher, ...data } : prevTeacher
          )
        );
        setEditingTeacherId(null);
        setNewTeacher({ name: "", subject: "" });
        if (callback) {
          callback(); 
        }
      })
      .catch((error) => console.error("Error updating teacher:", error));
  };

  return (
    <div className="teacher-container">
      <h2>Teachers</h2>
      <div className="teacher-form">
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newTeacher.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={newTeacher.subject}
          onChange={handleInputChange}
        />
        {editingTeacherId ? (
          <div className="model">
            <button onClick={() => handleSaveUpdate(editingTeacherId)}>
              Save Update
            </button>
            <button onClick={() => setEditingTeacherId(null)}>Cancel</button>
          </div>
        ) : (
          <button onClick={handleAddTeacher} className="add">
            Add Teacher
          </button>
        )}
      </div>
      <table className="teacher-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Subject</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher._id}>
              <td>{teacher.name}</td>
              <td>{teacher.subject}</td>
              <td>
                {editingTeacherId === teacher._id ? (
                  <div className="model">
                    <button onClick={() => handleSaveUpdate(teacher._id)}>
                      Save Update
                    </button>
                    <button onClick={() => setEditingTeacherId(null)}>
                      Cancel
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleUpdateTeacher(teacher)}
                      className="update"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDeleteTeacher(teacher._id)}
                      className="delete"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherList;
