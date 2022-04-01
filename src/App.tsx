import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import Header from "./pageComponents/Header/Header";
import ToolBar from "./pageComponents/Header/Toolbar/Toolbar";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      <ToolBar />
    </BrowserRouter>
  );
}

export default App;
