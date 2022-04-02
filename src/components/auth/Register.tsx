import * as React from "react";
import { useNavigate } from "react-router-dom";
import Mockup from "../../assets/images/pageImages/instagramMockup.png";
import authGuard from "../../guards/authGuard";
import Input from "../../pageComponents/Input/Input";
import NotificationProvider from "../../services/notificationProvider";
import { userRequests } from "../../services/requestProvider";

import "./auth.css";

export default function Register() {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [hideRetype, setHideRetype] = React.useState(true);

  const nav = useNavigate();

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [retypedPassword, setRetypedPassword] = React.useState("");

  React.useEffect(() => {
    if (authGuard(localStorage.getItem("token"))) {
      nav("/");
    }
  }, [nav]);

  const submitHandler = async () => {
    if (retypedPassword !== password) {
      return NotificationProvider(
        "Error",
        "The Retyped Password doesn't match the typed one",
        "danger"
      );
    }

    if (password.length < 8) {
      return NotificationProvider(
        "Error",
        "Password need's to be longer than 8 characters",
        "danger"
      );
    }

    const registerResponse = await userRequests.registerUser(
      email,
      firstName,
      lastName,
      username,
      password
    );

    if (registerResponse.error) {
      return NotificationProvider("Error", registerResponse.message, "danger");
    }

    NotificationProvider("Success", "Account successfully created", "success");
    nav("/login");
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
        <h1 className="mb-10 title">Create Your Account</h1>
        <Input
          type="text"
          placeholder="First Name"
          state={firstName}
          setState={setFirstName}
          isRequired={true}
        />
        <Input
          type="text"
          placeholder="Last Name"
          state={lastName}
          setState={setLastName}
          isRequired={true}
        />
        <Input
          type="text"
          placeholder="Username"
          state={username}
          setState={setUsername}
          isRequired={true}
        />
        <Input
          type="email"
          placeholder="Email"
          state={email}
          setState={setEmail}
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
        <div className="password-container">
          <Input
            type={hideRetype ? "password" : "text"}
            placeholder="Retype Password"
            state={retypedPassword}
            setState={setRetypedPassword}
            isRequired={true}
          />
          <i
            className={hideRetype ? "bi bi-eye" : "bi bi-eye-slash"}
            onClick={() => {
              setHideRetype(!hideRetype);
            }}
          ></i>
        </div>
        <p className="switch-mode-text">
          Already have a account ?{" "}
          <span
            onClick={() => {
              nav("/login");
            }}
          >
            Login
          </span>
        </p>
        <button className="mt-5 btn">Create Account</button>
      </form>
    </div>
  );
}
