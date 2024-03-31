import React, { useState, useEffect, createContext } from "react";
import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Login from "./Components/Login";
import Products from "./Components/Products";
import Register from "./Components/Register";
import Home from "./Components/Home";
import ModifyProducts from "./Components/ModifyProducts";
import ProductsAdmin from "./Components/ProductsAdmin";
import ProductsUser from "./Components/ProductsUser";
import Cookies from "js-cookie";
import AdminCreateProduct from "./Components/AdminCreateProduct";
import Logout from "./Components/Logout";

export const contextbuy = React.createContext();

function App() {
  const [userDetails, setUserDetails] = useState(null);

  const [buy, setBuy] = useState([]);

  // useEffect(() => {
  //   const user = Cookies.get("user");
  //   if (user && !userDetails) {
  //     setUserDetails(JSON.parse(user));
  //   }
  // }, [userDetails]);

  const handleLogout = () => {
    // Implement logout logic here

    Cookies.remove("user");
  };

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="links">
            <div>
              <Link to="home">Home</Link>
            </div>

            <div>
              <Link to="login">Login</Link>
            </div>

            <div>
              <Link to="products">Products</Link>
            </div>
            <div>
              <Link to="register">Register</Link>
            </div>
            <div>
              <Link to="/logout">Logout</Link>
              {/* <button onClick={handleLogout}>logout</button> */}
            </div>
          </div>
        </div>

        <contextbuy.Provider value={setBuy}>
          <div className="paths">
            <Routes>
              {/* Your other routes */}

              <Route path="login" element={<Login />} />
              <Route path="products" element={<Products />} />
              <Route path="register" element={<Register />} />
              <Route path="home" element={<Home />} />
              <Route path="modifyproducts/:id" element={<ModifyProducts />} />
              <Route path="productsadmin" element={<ProductsAdmin />} />
              <Route path="productsuser" element={<ProductsUser />} />
              <Route path="logout" element={<Logout></Logout>}></Route>
              <Route
                path="admincreateproduct"
                element={<AdminCreateProduct></AdminCreateProduct>}
              ></Route>
            </Routes>
          </div>
        </contextbuy.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
