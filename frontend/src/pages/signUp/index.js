import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../login/login.css";
import axios from "axios";
import jwt from "jwt-decode";

export default function SignUp() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    const params = {
      firstname: userData.firstName,
      lastname: userData.lastName,
      password: userData.password,
      email: userData.email,
    };
    await axios
      .post(`http://localhost:8080/api/auth/register`, params)
      .then(async (res) => {
        handleLogin();
      })
      .catch((error) => {
        console.log(error);
        alert(error.response.data.message);
      });
  };

  const handleLogin = async () => {
    const loginParams = {
      email: userData.email,
      password: userData.password,
    };
    await axios
      .post(`http://localhost:8080/api/auth/login`, loginParams)
      .then(async (res) => {
        const token = res.data.accessToken;
        const user = jwt(token);
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
        <h2 className="login-heading">Create a new account</h2>
        <form method="POST" onSubmit={handleRegister}>
          <label>First Name</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="firstName"
            value={userData.firstName}
            onChange={handleFormData}
            required
          />
          <label>Last Name</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="lastName"
            value={userData.lastName}
            onChange={handleFormData}
            required
          />
          <label>Email</label>
          <input
            type="text"
            placeholder="Enter Username"
            name="email"
            value={userData.email}
            onChange={handleFormData}
            required
          />
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={userData.password}
            onChange={handleFormData}
            required
          />
          <input type="submit" value="Sign Up" />
        </form>
        <NavLink to="/login">Already have an account!</NavLink>
      </div>
    </div>
  );
}
