import classes from "./Posts.module.css";
import React, { useEffect, useContext } from "react";
import { PostCtx } from "../../features/posts-ctx";
import { UiCtx } from "../../features/ui-ctx";
import Modal from "../../components/Modal/Modal";
import NavBanner from "../../components/NavBanner/NavBanner";
import SwipeAnim from "../../components/SwipeAnim/SwipeAnim";
const PostItemLazy = React.lazy(
  () => import("../../components/PostItem/PostItem")
);

const Posts = () => {
  const postsMgr = useContext(PostCtx);
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
      <NavBanner />
      {uiMgr.hasInteracted || <SwipeAnim />}
      <ul className={classes.ul} onScroll={() => uiMgr.setHasInteracted(true)}>
        {postsMgr.displayPosts.map((obj, index) => {
          return (
            <React.Suspense fallback={"loading..."}>
              <PostItemLazy key={`POST_MAIN_${index}`} obj={obj} />
            </React.Suspense>
          );
        })}
      </ul>
    </main>
  );
};

export default Posts;
