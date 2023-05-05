import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./login.css";
import axios from "axios";
import jwt from "jwt-decode";

export default function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginParams = {
      email: userData.email,
      password: userData.password,
    };
    await axios
      .post(`http://localhost:8080/api/auth/login`, loginParams)
      .then(async (res) => {
        const token = res.data.accessToken;
        const user = jwt(token);
        console.log("user", user);
        sessionStorage.setItem("token", JSON.stringify(token));
        sessionStorage.setItem("user", JSON.stringify(user.email));
        sessionStorage.setItem("userDetail", JSON.stringify(user));
        window.location.href = "/";
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <div className="login-box">
        <h2 className="login-heading">Login</h2>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            value={userData?.email}
            onChange={handleFormData}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={userData?.password}
            onChange={handleFormData}
            required
          />
          <input type="submit" value="Login" />
        </form>
        <NavLink to="/sign-up">Create new account</NavLink>
      </div>
    </div>
  );
}
