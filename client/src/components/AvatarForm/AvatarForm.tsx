import classes from "./AvatarForm.module.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { authCtx } from "../../features/auth-ctx";
import { UiCtx } from "../../features/ui-ctx";
import { userCtx } from "../../features/user-ctx";

const AvatarForm: React.FC = () => {
  const userMgr = useContext(userCtx);
  const uiMgr = useContext(UiCtx);
  const authMgr = useContext(authCtx);

  const [newUrl, setNewUrl] = useState("");

  const onUpdateAvatar = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    await axios
      .put(`/api/v1/${userMgr.currentUser.username}/avatar`, { newUrl })
      .then((serverRes) => {
        localStorage.setItem(
          "userValidation",
          JSON.stringify({
            avatar: newUrl,
          })
        );
        authMgr.setIsAuth(false);
        uiMgr.dispatch({ type: "CLOSE" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className={classes.form}>
      <h3 className={classes.h3}>Edit Profile Picture</h3>
      <input
        className={classes.input}
        type="text"
        placeholder="New Image URL"
        value={newUrl}
        onChange={(e) => {
          setNewUrl(e.target.value);
        }}
      />
      <input
        onClick={onUpdateAvatar}
        className={classes.inputBtn}
        type="submit"
        value="Update"
      />
      <button
        className={classes.inputBtn}
        onClick={(e) => {
          e.preventDefault();
          uiMgr.dispatch({ type: "CLOSE" });
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default AvatarForm;
