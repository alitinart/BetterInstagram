import * as React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Mockup from "../../assets/images/pageImages/instagramMockup.png";
import Input from "../../pageComponents/Input/Input";
import NotificationProvider from "../../services/notificationProvider";
import { userRequests } from "../../services/requestProvider";

import "./auth.css";

export default function Login() {
  const [hidePassword, setHidePassword] = React.useState(true);

  const nav = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submitHandler = async () => {
    const loginResponse = await userRequests.loginUser(username, password);

    if (loginResponse.error) {
      return NotificationProvider("Error", loginResponse.message, "danger");
    }

    console.log(loginResponse);
    localStorage.setItem("token", loginResponse.data.token);

    NotificationProvider(
      "Success",
      "Successfully logged into your account",
      "success"
    );
    dispatch({
      type: "login",
      token: loginResponse.data.token,
      userObject: loginResponse.data.userObject,
    });
    nav("/");
  };

  return (
    <div className="container flex-row-center pt-20 h-full register">
      <div className="side-image">
        <img src={Mockup} alt="Instagram on Phone" />
      </div>
      <form
        className="flex-column form"
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <h1 className="mb-10 title" style={{ textAlign: "center" }}>
          Login
        </h1>
        <Input
          type="text"
          placeholder="Username"
          state={username}
          setState={setUsername}
          isRequired={true}
        />
        <div className="password-container">
          <Input
            type={hidePassword ? "password" : "text"}
            placeholder="Password"
            state={password}
            setState={setPassword}
            isRequired={true}
          />
          <i
            className={hidePassword ? "bi bi-eye" : "bi bi-eye-slash"}
            onClick={() => {
              setHidePassword(!hidePassword);
            }}
          ></i>
        </div>
        <p className="switch-mode-text">
          Don't have a account ?{" "}
          <span
            onClick={() => {
              nav("/register");
            }}
          >
            Register
          </span>
        </p>
        <button className="mt-5 btn">Login</button>
      </form>
    </div>
  );
}
