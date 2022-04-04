import React, { useEffect, useState } from "react";
import authGuard from "../../guards/authGuard";
import Register from "../auth/Register";

export default function Main() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    if (authGuard(localStorage.getItem("token"))) {
      setLoggedIn(true);
    }
  }, []);

  return loggedIn ? <div className="main"></div> : <Register />;
}
