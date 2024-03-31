import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
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
  }

  return (
    <div>
      {userDetails ? (
        <div style={{ marginTop: "40px" }}>
          <h2>click here to logout</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h1>LogoutSuccessfull:</h1>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Logout;
