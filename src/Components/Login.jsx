import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import "../App.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("null");
  const [user, setUser] = useState(null);

  const navigateProdctsuser = useNavigate();
  const navigateProdctsadmin = useNavigate();

  const [loggedIn, setLoggedIn] = useState(false);
  const [invalid, setInvalid] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    

    axios
      .get("http://localhost:8080/register/get")
      .then((response) => {
        const users = response.data;
        const foundUser = users.find(
          (user) =>
            user.username === username &&
            user.password === password &&
            user.role === role
        );

        if (foundUser) {
          setUser(foundUser);
          setLoggedIn(true);
          // Store user details in cookies
          Cookies.set("user", JSON.stringify(foundUser));
        } else {
          // Handle invalid credentials
          setInvalid("Wrong credentials. Please try with valid credentials.");
          console.log("Invalid credentials");
        }
      })
      .catch((error) => {
        console.log("Error occurred while fetching user data:", error);
      });
  };

  const handleLogout = () => {
   
    Cookies.remove("user");

    setUser(null);
    setLoggedIn(false);
  };

  const myStyles = {
    margin: "40px",
    border: "2px solid black",
    color: "red",
  };

  return (
    <div>
      <div>
        Login Here
        <div className="allfroms">
          <form onSubmit={handleSubmit}>
            <div class="mb-0">
              <label for="exampleInputEmail1" class="form-label mt-4">
                Enter Username
              </label>
              <input
                type="text"
                class="form-control"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                aria-describedby="emailHelp"
              ></input>
            </div>

            <br />

            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label">
                Password
              </label>
              <input
                type="password"
                class="form-control"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>

            <select
              class="form-select"
              aria-label="Default select example"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option selected value="null">
                Select Role
              </option>
              <option value="admin">Admin</option>
              <option value="customer">Customer</option>
            </select>

            <button type="submit" className="btn bnt-primary " style={myStyles}>
              Submit
            </button>
          </form>
        </div>
        {loggedIn && (
          <div>
            <button onClick={handleLogout}>Logout</button>
            {user.role === "admin" && navigateProdctsadmin("/productsadmin")}
            {user.role === "customer" && navigateProdctsuser("/productsuser")}
          </div>
        )}
      </div>
      <div className="App2">
        {invalid === null ? <h1></h1> : <h1>{invalid}</h1>}
      </div>
    </div>
  );
};

export default Login;
