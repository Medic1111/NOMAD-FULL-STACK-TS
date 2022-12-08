import axios from "axios";
import { createContext, useContext, useState } from "react";
import { PostCtx } from "./posts-ctx";

export const userCtx = createContext({
  currentUser: {},
  setCurrentUser: () => {},
  userProfile: {},
  setUserProfile: () => {},
  fetchUser: (username) => {},
  authorOf: () => {},
});

const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const postsMgr = useContext(PostCtx);

  const authorOf = (userToFind) => {
    return postsMgr.displayPosts.filter((obj) => {
      return obj.username === userToFind;
    });
  };

  const [userProfile, setUserProfile] = useState({
    username: "",
    avatar: "",
    totalPosts: 0,
    posts: [],
  });

  const fetchUser = async (username) => {
    await axios
      .get(`/api/v1/users/${username}`)
      .then((serverRes) => {
        setUserProfile(serverRes.data);
      })
      .catch((err) => {
        // ADDRESS ERR BY GIVING USER FEEDBACK

        console.log(err);
      });
  };

  return (
    <userCtx.Provider
      value={{
        currentUser,
        setCurrentUser,
        userProfile,
        setUserProfile,
        fetchUser,
        authorOf,
      }}
    >
      {props.children}
    </userCtx.Provider>
  );
};

export default UserProvider;
