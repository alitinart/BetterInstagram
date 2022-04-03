import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import State from "../../models/state.model";
import NotificationProvider from "../../services/notificationProvider";
import { userRequests } from "../../services/requestProvider";

import "./Profile.css";

export default function Profile() {
  const { userObject } = useSelector((state: State) => state);

  const { token } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const profileChangeHandler = async (event: any) => {
    NotificationProvider(
      "Changing Profile Picture",
      "Your profile picture is changing",
      "info"
    );
    let data = new FormData();

    data.append("file", event.target.files[0]);

    const profileChangeResponse = await userRequests.changeProfileImage(
      token,
      data
    );

    if (profileChangeResponse.error) {
      return NotificationProvider(
        "Error",
        profileChangeResponse.message,
        "danger"
      );
    }

    const syncUserResponse = await userRequests.syncUser(token);
    dispatch({
      type: "sync",
      token: syncUserResponse.data.token,
      userObject: syncUserResponse.data.user,
    });
    NotificationProvider(
      "Success",
      "Successfully updated Profile Picture",
      "success"
    );
  };

  return userObject ? (
    <div className="container pt-20 profile">
      <div className="flex-row profile-info">
        <div className="pfp">
          <div
            className="profile-image"
            style={{ backgroundImage: `url("${userObject.profileImage}")` }}
          >
            <label className="profile-tint" htmlFor="profile-image-upload">
              <i className="bi bi-pencil"></i>
            </label>
            <input
              type={"file"}
              accept={"image/*"}
              id="profile-image-upload"
              onChange={profileChangeHandler}
            />
          </div>
        </div>
        <div className="info">
          <h1 className="username">{userObject.username}</h1>
          <p className="full-name">
            {userObject.name} {userObject.lastName}
          </p>
          <div className="counters">
            <p className="posts-counter">
              <strong>{userObject.posts.length}</strong> posts
            </p>
            <p className="followers-counter">
              <strong>{userObject.followers.length}</strong> followers
            </p>
            <p className="following-counter">
              <strong>{userObject.following.length}</strong> following
            </p>
          </div>
          <p className="bio">{userObject.bio}</p>
        </div>
      </div>
      <h1 className="title-posts">Posts</h1>
      <div className="posts">
        {userObject.posts.map((post) => {
          return (
            <div
              className="post"
              style={{
                backgroundImage: `url("${post.imageUrl}")`,
              }}
              key={post._id}
            >
              <div className="tint">
                <i className="bi bi-heart"></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <></>
  );
}
