import React, { useContext } from "react";
import { PostCtx } from "../../features/posts-ctx";
import { userCtx } from "../../features/user-ctx";
import { Post } from "../../models/user-models";
import classes from "./Vote.module.css";

const Vote: React.FC<{
  obj: Post;
  setObjToRender?: React.Dispatch<React.SetStateAction<Post>>;
}> = ({ obj, setObjToRender }) => {
  const userMgr = useContext(userCtx);
  const postMgr = useContext(PostCtx);
  console.log(obj);
  console.log(obj.up_by.includes(userMgr.currentUser.username));

  return (
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
            : postMgr.onUpVote(obj._id, setObjToRender);
        }}
      >
        arrow_upward
      </span>
      <span className={classes.upvoteCount}>{obj.voteCount}</span>
    </div>
  );
};

export default Vote;
