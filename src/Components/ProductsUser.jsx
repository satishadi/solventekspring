import axios from "axios";
import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { contextbuy } from "../App.js";

const ProductsUser = () => {
  const [proudcts, setProducts] = useState([]);
  const contextdata = useContext(contextbuy);
  const [bought, setBought] = useState(null);

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

  useEffect(() => {
    axios
      .get("http://localhost:8080/products/get")
      .then((n) => {
        console.log(n.data);
        setProducts(n.data);
      })
      .catch((n) => {
        console.log(n);
      });
  }, []);

  function handleBuy(n) {
    console.log(n.insuranceName);
    //contextdata([...n, n]);
    setBought("successfully bought this product");

    axios
      .post("http://localhost:8080/products/insbht", {
        productId: n.insuranceId,
      })
      .then((response) => {
        console.log("Registration successful!", response.data);
        // Optionally, you can do something upon successful registration
      })
      .catch((error) => {
        console.error("Error occurred during registration:", error);
        // Optionally, handle error
      });
  }

  return (
    <div>
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
      <div className="cards">
        {proudcts.map((n) => {
          return (
            <div>
              <div class="card" style={{ width: "18rem" }}>
                <div class="card-body">
                  <h5 class="card-title">{n.insuranceName}</h5>
                  <h6 class="card-subtitle mb-2 text-body-secondary">
                    Insurance Value
                    {n.insuranceValue}
                  </h6>
                  <p class="card-text">
                    Insurance Premium {n.insurancePremium}
                  </p>

                  {bought === null ? (
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        handleBuy(n);
                      }}
                    >
                      Buy Product
                    </button>
                  ) : (
                    bought
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductsUser;
