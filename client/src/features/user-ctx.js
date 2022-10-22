import { createContext, useState } from "react";
import dummyData from "../data/dummy";
export const userCtx = createContext({
  currentUser: "",
  setCurrentUser: () => {},
  userProfile: {},
  setUserProfile: () => {},
  fetchUser: (username) => {},
});

const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState("");

  const authorOf = (userToFind) => {
    return dummyData.filter((obj) => {
      return obj.username === userToFind;
    });
  };

  const [userProfile, setUserProfile] = useState({
    username: "",
    avatar: "",
    totalPosts: "",
    posts: "",
  });

  const fetchUser = (username) => {
    // REFACTOR TO API REQUEST
    setUserProfile({
      username: username,
      avatar: "",
      totalPosts: authorOf(username).length,
      posts: authorOf(username),
    });

    console.log(userProfile);
  };

  return (
    <userCtx.Provider
      value={{
        currentUser,
        setCurrentUser,
        userProfile,
        setUserProfile,
        fetchUser,
      }}
    >
      {props.children}
    </userCtx.Provider>
  );
};

export default UserProvider;
