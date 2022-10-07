import { createContext, useState } from "react";

export const userCtx = createContext({
  currentUser: "",
  setCurrentUser: () => {},
});

const UserProvider = (props) => {
  const [currentUser, setCurrentUser] = useState("");

  return (
    <userCtx.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {props.children}
    </userCtx.Provider>
  );
};

export default UserProvider;
