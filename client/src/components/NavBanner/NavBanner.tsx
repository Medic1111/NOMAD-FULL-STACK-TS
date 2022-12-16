import React, { useContext } from "react";
import { PostCtx } from "../../features/posts-ctx";
import { UiCtx } from "../../features/ui-ctx";
import { userCtx } from "../../features/user-ctx";
import classes from "./NavBanner.module.css";
import LabelBadge from "../LabelBadge/LabelBadge";

const NavBanner: React.FC = () => {
  const userMgr = useContext(userCtx);
  const postMgr = useContext(PostCtx);
  const uiMgr = useContext(UiCtx);

  return (
    <aside className={classes.aside}>
      <p className={classes.welcome}>Welcome {userMgr.currentUser.username}</p>
      <div className={classes.labelBtnBox}>
        {postMgr.isFiltering && <LabelBadge />}
        <button
          className={classes.btnCreate}
          onClick={() => {
            uiMgr.dispatch({ type: "CREATEPOST" });
          }}
        >
          +
        </button>
      </div>
    </aside>
  );
};

export default NavBanner;
