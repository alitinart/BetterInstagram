import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../assets/images/BetterInstagram.png";
import State from "../../models/state.model";

import "../pageComponents.css";
import Search from "../Search/Search";

export default function Header() {
  const { token } = useSelector((state: State) => state);
  const nav = useNavigate();

  return (
    <div className="container computer-view header">
      <img
        src={Logo}
        onClick={() => {
          nav("/");
        }}
        alt="BetterInstagram Logo"
      />
      {token ? <Search /> : <></>}
      {token ? (
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
      ) : (
        <></>
      )}
    </div>
  );
}
