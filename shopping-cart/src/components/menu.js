import React from "react";
import "./nav.css";

const Menu = ({ trigger }) => {
  let classes = "nav-menu";
  if (!trigger) classes += "-active";
  return (
    <div className={classes}>
      <p>Home</p>

      <p>Projects</p>

      <p>Courses</p>

      <p>Contact</p>
    </div>
  );
};

export default Menu;
