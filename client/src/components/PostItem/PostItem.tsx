import classes from "./PostItem.module.css";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userCtx } from "../../features/user-ctx";
import { PostCtx } from "../../features/posts-ctx";
import { Post } from "../../models/user-models";
import OptionBox from "../OptionBox/OptionBox";

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
          className={classes.avatarBox}
        >
          <img className={classes.avatar} src={obj.avatar} />
          <p className={classes.username}>{obj.username}</p>
        </div>
        <div className={classes.voteBox}>
          <span
            className={
              obj.up_by.includes(userMgr.currentUser.username)
                ? classes.upvoted
                : classes.upvote
            }
            onClick={() => {
              return obj.up_by.includes(userMgr.currentUser.username)
                ? null
                : postsMgr.onUpVote(obj._id);
            }}
          >
            ⬆
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
        {!postsMgr.isFiltering ? (
          <span
            className={classes.span}
            onClick={() => postsMgr.onMoreLikeThis(obj.label)}
          >
            more like this
          </span>
        ) : (
          <span
            className={classes.span}
            onClick={() => {
              postsMgr.setIsFiltering(false);
              postsMgr.fetchPostApi();
            }}
          >
            x {obj.label}
          </span>
        )}
        {obj.username === userMgr.currentUser.username && (
          <OptionBox username={obj.username} _id={obj._id} />
        )}
      </div>
    </li>
  );
};

export default PostItem;
