import { createStore } from "redux";

const appReducer = (
  state = { token: null, userObject: null, post: null },
  action
) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        token: action.token,
        userObject: action.userObject,
      };
    case "token":
      return {
        ...state,
        token: action.token,
      };
    case "sync":
      return {
        ...state,
        userObject: action.userObject,
        token: action.token,
      };
    case "logout":
      return {
        ...state,
        userObject: null,
        token: null,
      };
    case "show-post":
      return {
        ...state,
        postId: action.postId,
      };
    case "close-post":
      return {
        ...state,
        postId: "",
      };
    default:
      return { ...state };
  }
};

const store = createStore(appReducer);

export default store;
