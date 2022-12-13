import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { UserProfileTemplate } from "../models/user-models";
import { CurrentUserTemplate } from "../models/user-models";
import { UserCtxType } from "../models/user-models";
import { UiCtx } from "./ui-ctx";

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
  const uiMgr = useContext(UiCtx);

  const fetchUser = async (username: any) => {
    uiMgr.dispatch({ type: "LOADING" });
    await axios
      .get(`/api/v1/users/${username}`)
      .then((serverRes) => {
        setUserProfile(serverRes.data);
        uiMgr.dispatch({ type: "CLOSE" });
      })
      .catch((err) => {
        uiMgr.dispatch({ type: "CLOSE" });
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
