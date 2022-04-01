import * as React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import State from "../../../models/state.model";
import "../../pageComponents.css";

export default function ToolBar() {
  const { token } = useSelector((state: State) => state);

  return token ? (
    <div className="tool-bar">
      <div className="icons">
        <NavLink to={"/"}>
          <i className="bi bi-house icon"></i>
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
  ) : (
    <></>
  );
}
