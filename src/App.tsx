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
import { useDispatch } from "react-redux";
import { userRequests } from "./services/requestProvider";
import Profile from "./components/Profile/Profile";
import AddPost from "./components/AddPost/AddPost";
import NotificationProvider from "./services/notificationProvider";
import Results from "./components/Results/Results";
import Post from "./pageComponents/Post/Post";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getToken = async () => {
      let token = localStorage.getItem("token");
      if (!token) {
        return;
      }
      const syncResponse = await userRequests.syncUser(token);
      if (syncResponse.error) {
        localStorage.removeItem("token");
        return NotificationProvider(
          "Session Expired",
          "Your session has expired",
          "danger"
        );
      }
      dispatch({
        type: "sync",
        token: syncResponse.data.token,
        userObject: syncResponse.data.user,
      });
    };

    getToken();
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Post />
      <Header />
      <ReactNotifications />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/search/:query" element={<Results />} />
      </Routes>
      <ToolBar />
    </BrowserRouter>
  );
}

export default App;
