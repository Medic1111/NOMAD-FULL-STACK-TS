import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostCtx } from "../../features/posts-ctx";
import { UiCtx } from "../../features/ui-ctx";
import classes from "./OptionBox.module.css";

const OptionBox: React.FC<{ username: string; _id: string }> = ({
  username,
  _id,
}) => {
  const uiMgr = useContext(UiCtx);
  const postMgr = useContext(PostCtx);
  const nav = useNavigate();
  return (
    <div className={`${classes.userOptions} flex_center`}>
      <span
        className={classes.span}
        onClick={() => {
          postMgr.onDelPost(username, _id);
        }}
      >
        delete
      </span>
      <span
        className={classes.span}
        onClick={() => {
          postMgr.setPostIdToEdit(_id);
          uiMgr.dispatch({ type: "EDITPOST" });
          nav("/posts");
        }}
      >
        edit
      </span>
    </div>
  );
};

export default OptionBox;
