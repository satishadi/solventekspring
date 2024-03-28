import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const AdminCreateProduct = () => {
  const [insuranceName, setInsuranceName] = useState("");
  const [insuranceValue, setInsuranceValue] = useState("");
  const [insurancePremium, setInsurancePremium] = useState(""); // Default value is "null"
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
    if (!insuranceName || !insurancePremium || !insuranceValue === "null") {
      alert("Please fill in all fields");
      return;
    }

    // If form is valid, make the POST request using Axios
    axios
      .post("http://localhost:8080/products/add", {
        insuranceName: insuranceName,
        insurancePremium: insurancePremium,
        insuranceValue: insuranceValue,
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
    setInsuranceName("");
    setInsurancePremium("");
    setInsuranceValue("");
    setInfo("You have successfully registered ");
  };

  const myStyles = {
    margin: "40px",
    border: "2px solid black",
  };
  return (
    <div>
      AdminCreateProduct:
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
            <label for="insuranceName" class="form-label">
              Enter Insrance Name
            </label>
            <input
              type="text"
              class="form-control"
              id="insuranceName"
              value={insuranceName}
              onChange={(e) => {
                setInsuranceName(e.target.value);
              }}
              aria-describedby="emailHelp"
            ></input>
          </div>

          <div class="mb-3">
            <label for="insurancePremium" class="form-label">
              Enter Insurance Premium Value
            </label>
            <input
              type="number"
              class="form-control"
              id="insurancePremium"
              value={insurancePremium}
              onChange={(e) => {
                setInsurancePremium(e.target.value);
              }}
            ></input>
          </div>

          <br />

          <div class="mb-3">
            <label for="insurancevalue" class="form-label">
              Enter Insurance Value
            </label>
            <input
              type="number"
              class="form-control"
              id="insuranceValue"
              value={insuranceValue}
              onChange={(e) => {
                setInsuranceValue(e.target.value);
              }}
            ></input>
          </div>

          <button type="submit" style={myStyles} className="btn btn-primary">
            Submit
          </button>
        </form>
        {info}
      </div>
    </div>
  );
};

export default AdminCreateProduct;
