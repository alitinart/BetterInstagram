import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import authGuard from "../../guards/authGuard";
import State from "../../models/state.model";

export default function Main() {
  const [loggedIn, setLoggedIn] = useState(false);
  const { token } = useSelector((state: State) => state);

  useEffect(() => {
    if (authGuard(token)) {
      setLoggedIn(true);
    }
  }, []);

  return loggedIn ? <div className="main"></div> : <div className="auth"></div>;
}
