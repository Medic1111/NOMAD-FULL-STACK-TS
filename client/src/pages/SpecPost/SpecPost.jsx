import classes from "../../components/PostItem/PostItem.module.css";
import spec_classes from "./SpecPost.module.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { PostCtx } from "../../features/posts-ctx";
import { userCtx } from "../../features/user-ctx";

const SpecPost = () => {
  const postMgr = useContext(PostCtx);
  const userMgr = useContext(userCtx);

  const nav = useNavigate();

  const objToRender = postMgr.specPost;

  return (
    <main className={spec_classes.main}>
      <div className={classes.userBox}>
        <div
          className={classes.avatarBox}
          onClick={() => {
            userMgr.fetchUser(objToRender.username);
            nav(`/users/${objToRender.username}`);
          }}
        >
          <img className={classes.avatar} src={objToRender.avatar} />
          <p className={classes.username}>{objToRender.username}</p>
        </div>
        <div className={classes.voteBox}>
          <span className={classes.upvote}>⬆</span>
          <span className={classes.upvoteCount}>{objToRender.voteCount}</span>
        </div>
      </div>
      <img className={spec_classes.img} src={objToRender.url} />

      <h4 className={classes.title}>{objToRender.title}</h4>
      <p className={spec_classes.pContent}>{objToRender.content}</p>
      <div className={classes.pOptions}>
        <span className={classes.span}>more like this</span>
        {objToRender.username === userMgr.currentUser.username && (
          <div className={classes.userOptions}>
            <span className={classes.span}>delete</span>
            <span className={classes.span}>edit</span>
          </div>
        )}
      </div>
    </main>
  );
};

export default SpecPost;
