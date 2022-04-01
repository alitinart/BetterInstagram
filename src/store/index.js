import { createStore } from "redux";

const appReducer = (state = { token: null, userObject: null }, action) => {
  switch (action.type) {
    case "login":
      return {
        ...state,
        token: action.token,
        userObject: action.userObject,
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
    default:
      return { ...state };
  }
};

const store = createStore(appReducer);

export default store;
