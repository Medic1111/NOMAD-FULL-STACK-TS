import React, { useContext } from "react";
import classes from "./Modal.module.css";
import NewPostForm from "../NewPostForm/NewPostForm";
import { UiCtx } from "../../features/ui-ctx";
import AvatarForm from "../AvatarForm/AvatarForm";
import EditPostForm from "../EditPostForm/EditPostForm";
import Spinner from "../Spinner/Spinner";

const Modal: React.FC = () => {
  const uiMgr = useContext(UiCtx);
  return (
    <article className={classes.article}>
      {uiMgr.state.createPost && <NewPostForm />}
      {uiMgr.state.editAvatar && <AvatarForm />}
      {uiMgr.state.editPost && <EditPostForm />}
      {uiMgr.state.loading && <Spinner />}
    </article>
  );
};

export default Modal;
