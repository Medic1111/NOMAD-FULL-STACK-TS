import classes from "./User.module.css";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AvatarForm from "../../components/AvatarForm/AvatarForm";
import OptionBox from "../../components/OptionBox/OptionBox";
import { userCtx } from "../../features/user-ctx";
import { UiCtx } from "../../features/ui-ctx";
import MoreLikeThis from "../../components/MoreLikeThis/MoreLikeThis";

const User = () => {
  const nav = useNavigate();
  const userMgr = useContext(userCtx);
  const uiMgr = useContext(UiCtx);
  const userId = useParams();

  useEffect(() => {
    if (userId.id) userMgr.fetchUser(userId.id);
  }, [userId.id]);

  return (
    <main className={`${classes.main} flex_col_center`}>
      {uiMgr.state.editAvatar && <AvatarForm />}
      <h1 className={classes.h1}>{userMgr.userProfile.username}</h1>
      <div className={`${classes.avatarBox} flex_center`}>
        <img
          className={
            userMgr.currentUser.username === userId.id
              ? classes.userAvatar
              : classes.avatar
          }
          onClick={() =>
            userMgr.currentUser.username === userId.id &&
            uiMgr.dispatch({ type: "EDITAVATAR" })
          }
          src={userMgr.userProfile.avatar}
        />
      </div>
      <p className={classes.totalPosts}>
        total posts: {userMgr.userProfile.totalPosts}
      </p>
      <ul className={`${classes.ul} flex_col_center`}>
        {userMgr.userProfile.posts.map((obj, index) => {
          return (
            <li key={`PROFILE_POST_${index}`} className={classes.li}>
              <img
                onClick={() => nav(`/posts/${obj._id}`)}
                className={classes.img}
                src={obj.url}
              />
              <h4
                onClick={() => nav(`/posts/${obj._id}`)}
                className={classes.title}
              >
                {obj.title}
              </h4>
              <p className={classes.p}>{obj.content.substring(0, 95)}...</p>
              <div className={classes.pOptions}>
                <MoreLikeThis label={obj.label} />
                {obj.username === userMgr.currentUser.username && (
                  <OptionBox username={obj.username} _id={obj._id} />
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default User;
