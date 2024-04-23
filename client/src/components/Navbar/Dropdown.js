import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Dropdown = ({ submenus, dropdown }) => {
  return (
    <ul className={`${dropdown ? "show" : "dropdown"}`}>
      {submenus.map((submenu, index) => (
        <li className="submenu_items" key={index}>
          <Link to={submenu.url}>{submenu.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Dropdown;
