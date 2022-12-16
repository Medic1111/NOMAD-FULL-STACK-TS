import classes from "./PostItem.module.css";
import profile_classes from "../../pages/User/User.module.css";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { userCtx } from "../../features/user-ctx";
import { Post } from "../../models/user-models";
import OptionBox from "../OptionBox/OptionBox";
import MoreLikeThis from "../MoreLikeThis/MoreLikeThis";
import Vote from "../Vote/Vote";
import parse from "html-react-parser";

const PostItem: React.FC<{ obj: Post; profile?: boolean }> = ({
  obj,
  profile,
}) => {
  const nav = useNavigate();
  const userMgr = useContext(userCtx);

  return (
    <li className={profile ? profile_classes.li : classes.li}>
      {profile || (
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
          <Vote obj={obj} />
        </div>
      )}
      <img
        onClick={() => nav(`/posts/${obj._id}`)}
        className={profile ? profile_classes.img : classes.img}
        src={obj.url}
      />
      <h4 onClick={() => nav(`/posts/${obj._id}`)} className={classes.title}>
        {obj.title}
      </h4>
      <div className={classes.p}>{parse(obj.content.substring(0, 47))}...</div>
      <div className={profile ? profile_classes.pOptions : classes.pOptions}>
        <MoreLikeThis label={obj.label} />
        {obj.username === userMgr.currentUser.username && (
          <OptionBox username={obj.username} _id={obj._id} />
        )}
      </div>
    </li>
  );
};

export default PostItem;
