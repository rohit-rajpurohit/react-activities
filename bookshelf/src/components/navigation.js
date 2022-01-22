import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link, NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="warning">
      <Link className="navbar-brand" to="/">
        Bookshelf
      </Link>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="m-0" bg="warning">
          <NavLink className="nav-item nav-link" to="/books">
            Books
          </NavLink>
          <NavLink className="nav-item nav-link" to="/readers">
            Readers
          </NavLink>
          <NavLink className="nav-item nav-link" to="/login">
            Login
          </NavLink>
          <NavLink className="nav-item nav-link" to="/register">
            Register
          </NavLink>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
