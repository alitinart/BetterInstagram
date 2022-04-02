export default interface User {
  profileImage: string;
  name: string;
  lastName: string;
  email: string;
  password: string;
  username: string;
  posts: { _id: string; caption: string; imageUrl: string }[];
  stories: [];
  followers: [];
  following: [];
  bio: string;
}
