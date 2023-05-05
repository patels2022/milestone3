import React from "react";
import "./header.css";
import { NavLink } from "react-router-dom";

export default function Header() {
  let user = sessionStorage.getItem("user");
  return (
    <div>
      <ul className="header-ul">
        <li className="nav">
          <NavLink
            className={(isActive) => "nav-link" + (!isActive ? "" : "")}
            to="/"
          >
            SHOES Shopping .
          </NavLink>
        </li>
        <li className="nav">
          <NavLink className="nav-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav">
          <NavLink className="nav-link" to="/product">
            Products
          </NavLink>
        </li>
        <li className="nav">
          <NavLink className="nav-link" to="/hype">
            HYPE!
          </NavLink>
        </li>
        <li className="nav">
          <NavLink className="nav-link" to="/about-us">
            About Us
          </NavLink>
        </li>
        <li className="nav">
          {user ? (
            <span
              className="nav-link"
              onClick={() => {
                sessionStorage.removeItem("user");
                sessionStorage.removeItem("userDetail");
                sessionStorage.removeItem("token");
                window.location.href = "/";
              }}
              style={{ cursor: "pointer" }}
            >
              Log out
            </span>
          ) : (
            <NavLink className="nav-link" to="/login">
              Login
            </NavLink>
          )}
        </li>
        {user && (
          <li style={{ float: "right" }}>
            <NavLink className="nav-link" to="/user-cart">
              Cart
            </NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}
