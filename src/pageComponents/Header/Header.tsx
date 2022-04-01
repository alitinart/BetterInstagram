import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/images/BetterInstagram.png";

import "../pageComponents.css";
import Search from "../Search/Search";

export default function Header() {
  return (
    <div className="container computer-view header">
      <img src={Logo} alt="BetterInstagram Logo" />
      <Search />
      <div className="icons">
        <NavLink to={"/"}>
          <i className="bi bi-house icon"></i>
        </NavLink>
        <NavLink to={"/inbox"}>
          <i className="bi bi-chat icon"></i>
        </NavLink>
        <NavLink to={"/add-post"}>
          <i className="bi bi-plus-circle icon"></i>
        </NavLink>
        <NavLink to={"/discover"}>
          <i className="bi bi-compass icon"></i>
        </NavLink>
        <NavLink to={"/profile"}>
          <i className="bi bi-person icon"></i>
        </NavLink>
      </div>
    </div>
  );
}
