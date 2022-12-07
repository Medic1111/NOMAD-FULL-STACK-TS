import { useContext, useEffect } from "react";
import { userCtx } from "../../features/user-ctx";
import { useParams } from "react-router-dom";
import classes from "./User.module.css";
import { PostCtx } from "../../features/posts-ctx";

const User = () => {
  const userMgr = useContext(userCtx);
  const postMgr = useContext(PostCtx);
  const userId = useParams();

  useEffect(() => {
    userMgr.fetchUser(userId.id);
  }, []);

  return (
    <main className={classes.main}>
      <h1 className={classes.h1}>{userMgr.userProfile.username}</h1>
      <img className={classes.avatar} src={userMgr.userProfile.avatar} />
      <p className={classes.totalPosts}>
        total posts: {userMgr.userProfile.totalPosts}
      </p>
      <ul>
        {userMgr.userProfile.posts.map((obj, index) => {
          return (
            <li onClick={postMgr.fetchPost(obj._id)}>
              <img className={classes.img} src={obj.url} />

              <h4 className={classes.title}>{obj.title}</h4>
              <p className={classes.p}>{obj.content}</p>
              <div className={classes.pOptions}>
                <span className={classes.span}>more like this</span>
                {obj.username === userMgr.currentUser && (
                  <div className={classes.userOptions}>
                    <span className={classes.span}>delete</span>
                    <span className={classes.span}>edit</span>
                  </div>
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
