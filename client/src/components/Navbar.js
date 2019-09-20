import React from "react";
import { deleteToken } from "../Helpers/auth-helper";

import { NavLink, Link } from "react-router-dom";
const Navbar = ({ currentUser }) => {
  const renderNav = () => {
    switch (currentUser) {
      case null:
        return <p className="text-white">Loading</p>;
      case false: {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/register"
                style={{ fontSize: "17px" }}
              >
                Register <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/login"
                style={{ fontSize: "17px" }}
              >
                Login <span className="sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
        );
      }
      default:
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/dashboard`}
                style={{ fontSize: "17px" }}
              >
                {currentUser.nickname}{" "}
                <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/logout"
                style={{ fontSize: "17px" }}
                onClick={() => deleteToken()}
              >
                Logout <span className="sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
        );
    }
  };
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand">
            <h3>GroupCon</h3>
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/"
                style={{ fontSize: "17px" }}
              >
                Home <span className="sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
          {renderNav()}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
