import classes from "./User.module.css";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { userCtx } from "../../features/user-ctx";
import { PostCtx } from "../../features/posts-ctx";
import AvatarForm from "../../components/AvatarForm/AvatarForm";
import axios from "axios";
import EditPostForm from "../../components/EditPostForm/EditPostForm";

const User = () => {
  const userMgr = useContext(userCtx);
  const postMgr = useContext(PostCtx);
  const userId = useParams();

  const [showEditAvatar, setShowEditAvatar] = useState(false);
  const [showEditPost, setShowEditPost] = useState(false);
  const [postId, setPostId] = useState("");

  const handleEditPost = async (id) => {
    setPostId(id);
    setShowEditPost(true);
  };
  useEffect(() => {
    userMgr.fetchUser(userId.id);
  }, []);

  return (
    <main className={classes.main}>
      {showEditPost && (
        <EditPostForm setShowEditPost={setShowEditPost} id={postId} />
      )}
      {showEditAvatar && <AvatarForm setShowEditAvatar={setShowEditAvatar} />}
      <h1 className={classes.h1}>{userMgr.userProfile.username}</h1>
      <div className={classes.avatarBox}>
        <img
          className={
            userMgr.currentUser.username === userId.id
              ? classes.userAvatar
              : classes.avatar
          }
          onClick={
            userMgr.currentUser.username !== userId.id
              ? null
              : () => {
                  setShowEditAvatar(true);
                }
          }
          src={userMgr.userProfile.avatar}
        />
      </div>
      <p className={classes.totalPosts}>
        total posts: {userMgr.userProfile.totalPosts}
      </p>
      <ul className={classes.ul}>
        {userMgr.userProfile.posts.map((obj, index) => {
          return (
            <li key={`PROFILE_POST_${index}`} className={classes.li}>
              <img
                onClick={() => postMgr.fetchSpecPost(obj._id)}
                className={classes.img}
                src={obj.url}
              />
              <h4
                onClick={() => postMgr.fetchSpecPost(obj._id)}
                className={classes.title}
              >
                {obj.title}
              </h4>
              <p className={classes.p}>{obj.content.substring(0, 95)}...</p>
              <div className={classes.pOptions}>
                <span className={classes.span}>more like this</span>
                {obj.username === userMgr.currentUser.username && (
                  <div className={classes.userOptions}>
                    <span
                      className={classes.span}
                      onClick={() => {
                        postMgr.onDelPost(obj.username, obj._id);
                      }}
                    >
                      delete
                    </span>
                    <span
                      className={classes.span}
                      onClick={() => {
                        handleEditPost(obj._id);
                      }}
                    >
                      edit
                    </span>
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
