import React from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const { token } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  const fileUpload = (event: any) => {
    console.log(event.target.files[0]);
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

    NotificationProvider("Success", postResponse.message, "success");
  };

  return (
    <div className="container pt-20 add-post">
      <h1 className="mb-20 title">Create Post</h1>
      <form
        className="flex-column form"
        onSubmit={(e) => {
          e.preventDefault();
          submitHandler();
        }}
      >
        <label className="file-upload-label" htmlFor="file-upload">
          <img src={filePath} alt="Upload Icon" />
          <p className="mt-10 mb-10">Upload Image</p>
        </label>
        <input
          placeholder="Upload File"
          type="file"
          onChange={fileUpload}
          accept="image/*"
          id="file-upload"
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
        <button className="btn">Create Post</button>
      </form>
    </div>
  );
}
