import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

const Header = () => {
  return (
    <div className="app-header">
      <ul>
        <li>
            <h1>School Management System</h1>
        </li>
        <li className="header">
          <Link to="/teacher">Teacher</Link>
        </li>
        <li className="header">
          <Link to="/student">Student</Link>
        </li>
        <li className="header">
          <Link to="/marks">Marks</Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
