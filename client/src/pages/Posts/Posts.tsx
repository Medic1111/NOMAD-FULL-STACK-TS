import classes from "./Posts.module.css";
import { useEffect, useContext, useState } from "react";
import { userCtx } from "../../features/user-ctx";
import { PostCtx } from "../../features/posts-ctx";
import { UiCtx } from "../../features/ui-ctx";
import PostItem from "../../components/PostItem/PostItem";
import Modal from "../../components/Modal/Modal";
import LabelBadge from "../../components/LabelBadge/LabelBadge";
import { Slide, Bounce } from "react-awesome-reveal";

const Posts = () => {
  const postsMgr = useContext(PostCtx);
  const userMgr = useContext(userCtx);
  const postMgr = useContext(PostCtx);
  const uiMgr = useContext(UiCtx);

  const fetchPostApi = async () => {
    if (
      postsMgr.isFiltering ||
      uiMgr.state.createPost ||
      uiMgr.state.editAvatar ||
      uiMgr.state.editPost
    ) {
      return;
    }
    postMgr.fetchPostApi();
  };
  useEffect(() => {
    fetchPostApi();
  }, [uiMgr.state.createPost]);

  return (
    <main className={classes.main} onClick={() => uiMgr.setHasInteracted(true)}>
      {uiMgr.state.showModal && <Modal />}
      <aside className={classes.aside}>
        <p className={classes.welcome}>
          Welcome {userMgr.currentUser.username}
        </p>
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
      {uiMgr.hasInteracted || (
        <Slide delay={2500} direction="right" className={classes.slide}>
          <Bounce className={`${classes.swipe} material-symbols-outlined`}>
            swipe
          </Bounce>
        </Slide>
      )}
      <ul className={classes.ul} onScroll={() => uiMgr.setHasInteracted(true)}>
        {postsMgr.displayPosts.map((obj, index) => {
          return <PostItem key={`POST_${index}`} obj={obj} />;
        })}
      </ul>
    </main>
  );
};

export default Posts;
