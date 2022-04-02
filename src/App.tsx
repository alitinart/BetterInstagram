import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import Header from "./pageComponents/Header/Header";
import ToolBar from "./pageComponents/Header/Toolbar/Toolbar";

import { ReactNotifications } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <ToolBar />
    </BrowserRouter>
  );
}

export default App;
