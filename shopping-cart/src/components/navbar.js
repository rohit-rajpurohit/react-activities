import React from "react";
import "./nav.css";

// Stateless Functional Component
const NavBar = ({ totalCounters, onClick, trigger }) => {
  let classes = "hamburger";
  if (!trigger) classes += "-active";
  return (
    <nav className="navbar navbar-light bg-light p-4">
      <div onClick={onClick} className={classes}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>
      <a className="navbar-brand" href="/">
        Cart{" "}
        <span className="badge badge-pill badge-secondary">
          {totalCounters}
        </span>
      </a>
    </nav>
  );
};

export default NavBar;
