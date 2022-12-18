import classes from "./AvatarForm.module.css";
import React, { useState, useContext } from "react";
import axios from "axios";
import { authCtx } from "../../features/auth-ctx";
import { UiCtx } from "../../features/ui-ctx";
import { userCtx } from "../../features/user-ctx";
import ImgUpload from "../ImgUpload/ImgUpload";

const AvatarForm: React.FC = () => {
  const userMgr = useContext(userCtx);
  const uiMgr = useContext(UiCtx);
  const authMgr = useContext(authCtx);

  const [url, setUrl] = useState("");

  const onUpdateAvatar = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    await axios
      .put(`/api/v1/${userMgr.currentUser.username}/avatar`, { url })
      .then((serverRes) => {
        localStorage.setItem(
          "userValidation",
          JSON.stringify({
            avatar: url,
          })
        );
        authMgr.setIsAuth(false);
        uiMgr.dispatch({ type: "CLOSE" });
      })
      .catch((err) => console.log(err));
  };

  return (
    <article className={classes.article}>
      <h3 className={classes.h3}>Edit Profile Picture</h3>
      <ImgUpload setUrl={setUrl} url={url} />
      <form className={`${classes.form} flex_col_center`}>
        <input
          disabled={url === "" ? true : false}
          onClick={onUpdateAvatar}
          // className={`${classes.inputBtn} btn_standard`}
          className={
            url === ""
              ? `${classes.disabled} btn_standard`
              : `${classes.submitBtn} btn_standard`
          }
          type="submit"
          value="Update"
        />
        <button
          className={`${classes.inputBtn} btn_standard`}
          onClick={(e) => {
            e.preventDefault();
            uiMgr.dispatch({ type: "CLOSE" });
          }}
        >
          Cancel
        </button>
      </form>
    </article>
  );
};

export default AvatarForm;
