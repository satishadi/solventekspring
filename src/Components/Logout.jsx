import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Logout = () => {
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const user = Cookies.get("user");
    if (user) {
      setUserDetails(JSON.parse(user));
    }
  }, []);

  return (
    <div>
      LogoutSuccessfull:<Link to="/login">Login</Link>
    </div>
  );
};

export default Logout;
