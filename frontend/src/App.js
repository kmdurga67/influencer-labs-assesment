import React from "react";
import StudentList from "./components/StudentList";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TeacherList from "./components/TeacherList";
import MarkList from "./components/MarkList";
import "./App.css";
import Error from "./components/Error";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/teacher" element={<TeacherList />} errorElement={<Error/>}/>
        <Route path="/student" element={<StudentList />} errorElement={<Error/>} />
        <Route path="/marks" element={<MarkList />} errorElement={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
