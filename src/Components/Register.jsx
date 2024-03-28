import React, { useEffect, useState } from "react";
import axios from "axios"; // Import Axios
import { Link, Navigate, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("null"); // Default value is "null"
  const [info, setInfo] = useState("");
  const [userDetails, setUserDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setUserDetails(JSON.parse(user));
    }
  }, []);

  function handleLogout() {
    Cookies.remove("user");
    setUserDetails(null);
    navigate("/login");
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!username || !password || role === "null") {
      alert("Please fill in all fields");
      return;
    }

    // If form is valid, make the POST request using Axios
    axios
      .post("http://localhost:8080/register/add", {
        username: username,
        password: password,
        role: role,
      })
      .then((response) => {
        console.log("Registration successful!", response.data);
        // Optionally, you can do something upon successful registration
      })
      .catch((error) => {
        console.error("Error occurred during registration:", error);
        // Optionally, handle error
      });

    // Optionally, reset form fields after successful submission
    setUsername("");
    setPassword("");
    setRole("null");
    setInfo("You have successfully registered ");
  };

  const myStyles = {
    margin: "40px",
    border: "2px solid black",
  };

  return (
    <div>
      Register:
      <div className="logindetails">
        {userDetails && (
          <div>
            <h7>User Details</h7>
            <h6>Username: {userDetails.username}</h6>
            <h6>Role: {userDetails.role}</h6>
            <button onClick={handleLogout} className="btn btn-tertiary">
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="allfroms">
        <form onSubmit={handleSubmit}>
          <br />

          <div class="mb-3">
            <label for="username" class="form-label">
              Enter Username
            </label>
            <input
              type="text"
              class="form-control"
              id="username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              aria-describedby="emailHelp"
            ></input>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">
              Password
            </label>
            <input
              type="password"
              class="form-control"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>

          <br />

          <select
            class="form-select"
            aria-label="Default select example"
            id="role"
            value={role}
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <option selected>Select Role</option>
            <option value="admin">Admin</option>
            <option value="customer">Customer</option>
          </select>

          <button type="submit" style={myStyles} className="btn btn-primary">
            Submit
          </button>
        </form>
        {info}
        {info === "" ? (
          ""
        ) : (
          <button className="btn btn-secondary">
            <Link to="/login">Login</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Register;
