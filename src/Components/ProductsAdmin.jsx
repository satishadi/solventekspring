import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../App.css";
import Cookies from "js-cookie";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);

  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

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
    // Fetch products
    axios
      .get("http://localhost:8080/products/get")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
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
      <div>
        <button className="btn btn-sucess">
          <Link to="/admincreateproduct">Create Product</Link>
        </button>
      </div>
      <div className="cards">
        {products.map((product) => (
          <div key={product.id}>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{product.insuranceName}</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Insurance Value: {product.insuranceValue}
                </h6>
                <p className="card-text">
                  Insurance Premium: {product.insurancePremium}
                </p>
                <button className="btn btn-success">
                  <Link to={`/modifyproducts/${product.insuranceId}`}>
                    Modify
                  </Link>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsAdmin;
