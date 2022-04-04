import User from "./user.model";

export default interface State {
  token: string;
  userObject: User;
  postId: string;
}
