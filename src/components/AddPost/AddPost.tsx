import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Comment from "../../models/comment.model";
import State from "../../models/state.model";
import Input from "../../pageComponents/Input/Input";
import NotificationProvider from "../../services/notificationProvider";
import { postRequests, userRequests } from "../../services/requestProvider";

import "./AddPost.css";

export default function AddPost() {
  const [file, setFile] = React.useState<Blob | any>();
  const [filePath, setFilePath] = React.useState<string>(
    "https://www.jing.fm/clipimg/full/251-2512840_icona-download-gratuito-e-ios-12-camera-icon.png"
  );
  const [caption, setCaption] = React.useState("");
  const [location, setLocation] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  const { token, userObject } = useSelector((state: State) => state);
  const dispatch = useDispatch();
  const nav = useNavigate();

  const fileUpload = (event: any) => {
    setFile(event.target.files[0]);
    setFilePath(URL.createObjectURL(event.target.files[0]));
  };

  const submitHandler = async () => {
    let data = new FormData();

    data.append("file", file);
    data.append("caption", caption);
    data.append("location", location);

    const postResponse = await postRequests.createPost(token, data);

    if (postResponse.error) {
      return NotificationProvider("Error", postResponse.message, "danger");
    }

    const syncResponse = await userRequests.syncUser(token);

    dispatch({
      type: "sync",
      userObject: syncResponse.data.user,
      token: syncResponse.data.token,
    });

    setLoading(false);
    NotificationProvider("Success", postResponse.message, "success");
    nav("/profile");
  };

  const dummyComments: Comment[] = [
    {
      _id: "12321312",
      username: "Don Haci",
      comment: "Nice photo there man !",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQnVF6kPOwLxFmwHuLQIn-_f6lLFACKWYdCw&usqp=CAU",
    },
    {
      _id: "12321312",
      username: "Jason Bourne",
      comment: "Right on !",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsQ-YHX2i3RvTDDmpfnde4qyb2P8up7Wi3Ww&usqp=CAU",
    },
    {
      _id: "12321312",
      username: "Unkwn",
      comment: "Keep it up champ !",
      profileImage:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTUEgE45wBPSyEEe2Aigcp4bkCPuOs7rcLi3A&usqp=CAU",
    },
  ];

  return (
    <div className="container add-post-container">
      <div className="post-preview">
        <img src={filePath} alt="Post" className="post-image" />
        <div className="post-info">
          <div className="user-info">
            <img src={userObject.profileImage} alt="User Profile" />
            <div>
              <h3>{userObject.username}</h3>
              <p>{location}</p>
            </div>
          </div>
          <p className="caption">{caption}</p>
          <div className="comments">
            {dummyComments.map((comment) => {
              return (
                <div className="comment" key={comment._id}>
                  <img
                    src={comment.profileImage}
                    alt={comment.username + "'s Profile"}
                  />
                  <div className="comment-info">
                    <h3>{comment.username}</h3>
                    <p>{comment.comment}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="pt-20 add-post">
        <h1 className="mb-20 title">Create Post</h1>
        <form
          className="flex-column form"
          onSubmit={(e) => {
            e.preventDefault();
            !loading ? submitHandler() : console.log("Posting...🕐");
            setLoading(true);
          }}
        >
          {/* <label className="file-upload-label" htmlFor="file-upload">
          <img src={filePath} alt="Upload Icon" />
        </label> */}
          <input
            placeholder="Upload File"
            type="file"
            onChange={fileUpload}
            accept="image/*"
            required
          />
          <Input
            placeholder="Caption"
            type="text"
            isRequired={true}
            state={caption}
            setState={setCaption}
          />
          <Input
            placeholder="Location"
            type="text"
            isRequired={true}
            state={location}
            setState={setLocation}
          />
          <button className="btn">
            {loading ? <div className="loader"></div> : "Create Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
