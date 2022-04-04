import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "../../models/comment.model";
import PostObject from "../../models/post.model";
import State from "../../models/state.model";
import NotificationProvider from "../../services/notificationProvider";
import { postRequests, userRequests } from "../../services/requestProvider";

import "../pageComponents.css";

export default function Post() {
  const [poster, setPoster] = React.useState<any>();
  const [postObject, setPost] = React.useState<PostObject | undefined>();

  const { postId } = useSelector((state: State) => state);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const getPostRequest = async () => {
      if (!postId) {
        return;
      }
      const getPostResponse = await postRequests.getPostById(postId);
      console.log(getPostResponse);

      if (getPostResponse.error) {
        return NotificationProvider("Error", getPostResponse.message, "danger");
      }

      const getUserResponse = await userRequests.getUserById(
        getPostResponse.data.post.userId
      );

      if (getUserResponse.error) {
        return NotificationProvider("Error", getUserResponse.message, "danger");
      }

      setPoster(getUserResponse.data.user);
      setPost(getPostResponse.data.post);
    };

    getPostRequest();
  }, [postId]);

  return postObject ? (
    <div className="post-tint">
      <div className="post-preview post-overlay">
        <i
          className="bi bi-x close-icon"
          onClick={() => {
            setPost(undefined);
            dispatch({
              type: "close-post",
            });
          }}
        ></i>
        <img src={postObject.files[0]} alt="Post" className="post-image" />
        <div className="post-info">
          <div className="user-info">
            {poster ? (
              <img src={poster.profileImage} alt="User Profile" />
            ) : (
              <></>
            )}
            <div>
              {poster ? <h3>{poster.username}</h3> : <></>}
              <p>{postObject.location}</p>
            </div>
          </div>
          <p className="caption">{postObject.caption}</p>
          {postObject.comments.length > 0 ? (
            <div className="comments">
              {postObject.comments.map((comment: Comment) => {
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
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
