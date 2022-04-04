import Comment from "./comment.model";

export default interface PostObject {
  files: string[];
  userId: string;
  location: string;
  caption: string;
  comments: Comment[];
}
