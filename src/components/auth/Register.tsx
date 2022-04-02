import * as React from "react";
import Mockup from "../../assets/images/pageImages/instagramMockup.png";
import Input from "../../pageComponents/Input/Input";

import "./auth.css";

export default function Register() {
  const [hidePassword, setHidePassword] = React.useState(true);
  const [hideRetype, setHideRetype] = React.useState(true);

  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [retypedPassword, setRetypedPassword] = React.useState("");

  return (
    <div className="container flex-row-center pt-20 h-full register">
      <div className="side-image">
        <img src={Mockup} alt="Instagram on Phone" />
      </div>
      <form className="flex-column form">
        <h1 className="mb-10 title">Create Your Account</h1>
        <Input
          type="text"
          placeholder="First Name"
          state={firstName}
          setState={setFirstName}
        />
        <Input
          type="text"
          placeholder="Last Name"
          state={lastName}
          setState={setLastName}
        />
        <Input
          type="email"
          placeholder="Email"
          state={email}
          setState={setEmail}
        />
        <div className="password-container">
          <Input
            type={hidePassword ? "password" : "text"}
            placeholder="Password"
            state={password}
            setState={setPassword}
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
          />
          <i
            className={hideRetype ? "bi bi-eye" : "bi bi-eye-slash"}
            onClick={() => {
              setHideRetype(!hideRetype);
            }}
          ></i>
        </div>
        <button className="mt-5 btn" type="submit">
          Create Account
        </button>
      </form>
    </div>
  );
}
