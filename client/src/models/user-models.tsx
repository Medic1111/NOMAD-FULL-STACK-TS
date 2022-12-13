import React from "react";

export interface CurrentUser {
  username: string;
  avatar: string;
}

export interface UserProfile {
  username: string;
  avatar: string;
  totalPosts: number;
  posts: Post[];
}

export interface Post {
  _id: string;
  username: string;
  avatar: string;
  voteCount: number;
  url: string;
  title: string;
  content: string;
  up_by: string[];
  __v: number;
  label: string;
}

export interface UserCtxType {
  currentUser: CurrentUser;
  setCurrentUser: React.Dispatch<React.SetStateAction<CurrentUser>>;
  fetchUser: (username: any) => void;
  userProfile: UserProfile;
  setUserProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
}

// TEMPLATES

export const CurrentUserTemplate = {
  username: "",
  avatar: "",
};

export const PostTemplate = {
  _id: "",
  username: "",
  avatar: "",
  voteCount: 0,
  url: "",
  title: "",
  content: "",
  up_by: [""],
  __v: 0,
  label: "",
};

export const UserProfileTemplate = {
  username: "",
  avatar: "",
  totalPosts: 0,
  posts: [PostTemplate],
};
