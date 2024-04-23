import React, { useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import Dropdown from "./Dropdown";

const MenuItems = ({ items }) => {
  const [dropdown, setDropdown] = useState(false);

  return (
    <li
      className="menu_items"
      onMouseEnter={() => setDropdown(true)}
      onMouseLeave={() => setDropdown(false)}
    >
      {items.submenu ? (
        <>
          <Link to={items.url}>
            {items.icon}
            {items.page}
          </Link>
          <Dropdown submenus={items.submenu} dropdown={dropdown} />
        </>
      ) : (
        <Link to={items.url}>
          <>
            {items.icon}
            {items.page}
          </>
        </Link>
      )}
    </li>
  );
};

export default MenuItems;
