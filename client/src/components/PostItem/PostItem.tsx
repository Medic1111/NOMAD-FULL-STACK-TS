import classes from "./PostItem.module.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userCtx } from "../../features/user-ctx";
import { PostCtx } from "../../features/posts-ctx";
import { Post } from "../../models/user-models";
import OptionBox from "../OptionBox/OptionBox";
import MoreLikeThis from "../MoreLikeThis/MoreLikeThis";

const PostItem: React.FC<{ obj: Post }> = ({ obj }) => {
  const nav = useNavigate();
  const userMgr = useContext(userCtx);
  const postsMgr = useContext(PostCtx);

  return (
    <li className={classes.li}>
      <div className={classes.userBox}>
        <div
          onClick={() => {
            nav(`/users/${obj.username}`);
          }}
          className={`${classes.avatarBox}`}
        >
          <img className={classes.avatar} src={obj.avatar} />
          <p className={classes.username}>{obj.username}</p>
        </div>
        <div className={`${classes.voteBox} flex_center`}>
          <span
            className={
              obj.up_by.includes(userMgr.currentUser.username)
                ? `${classes.upvoted} material-symbols-outlined`
                : `${classes.upvote} material-symbols-outlined`
            }
            onClick={() => {
              return obj.up_by.includes(userMgr.currentUser.username)
                ? null
                : postsMgr.onUpVote(obj._id);
            }}
          >
            arrow_upward
          </span>
          <span className={classes.upvoteCount}>{obj.voteCount}</span>
        </div>
      </div>
      <img
        onClick={() => nav(`/posts/${obj._id}`)}
        className={classes.img}
        src={obj.url}
      />
      <h4 onClick={() => nav(`/posts/${obj._id}`)} className={classes.title}>
        {obj.title}
      </h4>
      <p className={classes.p}>{obj.content.substring(0, 97)}...</p>
      <div className={classes.pOptions}>
        <MoreLikeThis label={obj.label} />
        {obj.username === userMgr.currentUser.username && (
          <OptionBox username={obj.username} _id={obj._id} />
        )}
      </div>
    </li>
  );
};

export default PostItem;
