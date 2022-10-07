import classes from "./PostItem.module.css";
import { useContext } from "react";
import { userCtx } from "../../features/user-ctx";

const PostItem = ({ avatar, username, voteCount, url, title, content }) => {
  const userMgr = useContext(userCtx);

  return (
    <li className={classes.li}>
      <div className={classes.userBox}>
        <div className={classes.avatarBox}>
          <img className={classes.avatar} src={avatar} />
          <p className={classes.username}>{username}</p>
        </div>
        <div className={classes.voteBox}>
          <span className={classes.upvote}>⬆</span>
          <span className={classes.upvoteCount}>{voteCount}</span>
        </div>
      </div>
      <img className={classes.img} src={url} />

      <h4 className={classes.title}>{title}</h4>
      <p className={classes.p}>{content.substring(0, 97)}...</p>
      <p className={classes.pOptions}>
        <span className={classes.span}>more like this</span>
        {username === userMgr.currentUser && (
          <div className={classes.userOptions}>
            <span className={classes.span}>delete</span>
            <span className={classes.span}>edit</span>
          </div>
        )}
      </p>
    </li>
  );
};

export default PostItem;
