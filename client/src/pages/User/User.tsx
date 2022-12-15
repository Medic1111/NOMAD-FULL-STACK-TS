import classes from "./User.module.css";
import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AvatarForm from "../../components/AvatarForm/AvatarForm";
import { userCtx } from "../../features/user-ctx";
import { UiCtx } from "../../features/ui-ctx";
import PostItem from "../../components/PostItem/PostItem";

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
        {userMgr.currentUser.username === userId.id && (
          <span className={`${classes.x} material-symbols-outlined`}>edit</span>
        )}
      </div>
      <p className={classes.totalPosts}>
        total posts: {userMgr.userProfile.totalPosts}
      </p>
      <ul className={`${classes.ul} flex_col_center`}>
        {userMgr.userProfile.posts.map((obj, index) => {
          return <PostItem key={`POST_${index}`} obj={obj} profile={true} />;
        })}
      </ul>
    </main>
  );
};

export default User;
