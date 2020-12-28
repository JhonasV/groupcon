import React from "react";
import { deleteToken } from "../Helpers/auth-helper";

import { NavLink, Link } from "react-router-dom";
import Loading from "./Loading";

import { connect } from 'react-redux';

const Navbar = ({ isAuthenticated, currentUser }) => {
  const renderNav = () => {
    switch (isAuthenticated) {
      case null:
        return <Loading className="spinner-border-sm text-white" />;
      case false: {
        return (
          <ul className="navbar-nav ml-auto">
            <li className="nav-item ">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/login"
                style={{ fontSize: "17px" }}
              >
                <i className="fa fa-sign-in"></i> Login{" "}
                <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item ">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/register"
                style={{ fontSize: "17px" }}
              >
                <i className="fa fa-user"></i> Register{" "}
                <span className="sr-only">(current)</span>
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
                to={`/`}
                style={{ fontSize: "17px" }}
              >
                <i className="fa fa-user"></i> Welcome: { currentUser.nickname }                
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/dashboard`}
                style={{ fontSize: "17px" }}
              >
                <i className="fa fa-bar-chart"></i> Dashboard
                <span className="sr-only">(current)</span>
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/dashboard/create`}
                style={{ fontSize: "17px" }}
              >
                <i className="fa fa-plus-circle"></i> New Group
              </NavLink>
            </li>
            <li className="nav-item ">
              <a
                href="/"
                className="nav-link"
                style={{ fontSize: "17px" }}
                onClick={e => deleteToken(e)}
              >
                <i className="fa fa-sign-out"></i> Logout{" "}
                <span className="sr-only">(current)</span>
              </a>
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
          data-target="#navbar-group"
          aria-controls="navbar-group"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar-group">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item ">
              <NavLink
                activeClassName="active"
                className="nav-link"
                to="/"
                style={{ fontSize: "17px" }}
              >
                <i className="fa fa-home"></i> Home{" "}
                <span className="sr-only">(current)</span>
              </NavLink>
            </li>
          </ul>
          {renderNav()}
        </div>
      </div>
    </nav>
  );
};


const mapStateToProps = state =>{
  return {
    currentUser: state.authReducer.currentUser,
    isAuthenticated: state.authReducer.isAuthenticated
  }
}

export default connect(mapStateToProps)(Navbar);
