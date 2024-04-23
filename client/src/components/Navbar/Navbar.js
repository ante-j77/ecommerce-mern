import React from "react";
import "./Navbar.css";
import menuItems from "./menuData";
import MenuItems from "./MenuItems";

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="menus">
        {/* stranice menia */}
        {menuItems.map((menu, index) => {
          return <MenuItems items={menu} key={index} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
