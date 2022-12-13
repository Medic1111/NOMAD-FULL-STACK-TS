import axios from "axios";
import React, { createContext, useState } from "react";
import { UserProfileTemplate } from "../models/user-models";
import { CurrentUserTemplate } from "../models/user-models";
import { UserCtxType } from "../models/user-models";

export const userCtx = createContext<UserCtxType>({
  currentUser: CurrentUserTemplate,
  setCurrentUser: () => {},
  userProfile: UserProfileTemplate,
  setUserProfile: () => {},
  fetchUser: (username: string) => {},
});

const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState(CurrentUserTemplate);
  const [userProfile, setUserProfile] = useState(UserProfileTemplate);

  const fetchUser = async (username: any) => {
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
      }}
    >
      {children}
    </userCtx.Provider>
  );
};

export default UserProvider;
