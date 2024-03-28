import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const ProductsUser = () => {
  const [proudcts, setProducts] = useState([]);

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

                  <button className="btn btn-success">Buy Product</button>
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
