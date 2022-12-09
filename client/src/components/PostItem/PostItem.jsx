import classes from "./PostItem.module.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userCtx } from "../../features/user-ctx";
import { PostCtx } from "../../features/posts-ctx";

const PostItem = ({
  avatar,
  username,
  voteCount,
  url,
  title,
  content,
  id,
  up_by,
}) => {
  const userMgr = useContext(userCtx);
  const postMgr = useContext(PostCtx);
  const nav = useNavigate();

  return (
    <li className={classes.li}>
      <div className={classes.userBox}>
        <div
          onClick={() => {
            userMgr.fetchUser(username);
            nav(`/users/${username}`);
          }}
          className={classes.avatarBox}
        >
          <img className={classes.avatar} src={avatar} />
          <p className={classes.username}>{username}</p>
        </div>
        <div className={classes.voteBox}>
          <span
            className={
              up_by.includes(userMgr.currentUser.username)
                ? classes.upvoted
                : classes.upvote
            }
            onClick={() => {
              return up_by.includes(userMgr.currentUser.username)
                ? null
                : postMgr.onUpVote(id);
            }}
          >
            ⬆
          </span>
          <span className={classes.upvoteCount}>{voteCount}</span>
        </div>
      </div>
      <img
        onClick={() => postMgr.fetchSpecPost(id)}
        className={classes.img}
        src={url}
      />

      <h4 onClick={() => postMgr.fetchSpecPost(id)} className={classes.title}>
        {title}
      </h4>
      <p className={classes.p}>{content.substring(0, 97)}...</p>
      <div className={classes.pOptions}>
        <span className={classes.span}>more like this</span>
        {username === userMgr.currentUser.username && (
          <div className={classes.userOptions}>
            <span
              className={classes.span}
              onClick={() => postMgr.onDelPost(username, id)}
            >
              delete
            </span>
            <span className={classes.span}>edit</span>
          </div>
        )}
      </div>
    </li>
  );
};

export default PostItem;
