import * as React from "react";
import { useSelector } from "react-redux";
import State from "../../models/state.model";

import "./Profile.css";

export default function Profile() {
  const { userObject } = useSelector((state: State) => state);

  return userObject ? (
    <div className="container pt-20 profile">
      <div className="flex-row profile-info">
        <div className="pfp">
          <img src={userObject.profileImage} alt="Profile" />
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
