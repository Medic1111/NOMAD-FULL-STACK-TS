import classes from "../../components/PostItem/PostItem.module.css";
import spec_classes from "./SpecPost.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import OptionBox from "../../components/OptionBox/OptionBox";
import { PostCtx } from "../../features/posts-ctx";
import { userCtx } from "../../features/user-ctx";

const SpecPost: React.FC = () => {
  const postMgr = useContext(PostCtx);
  const userMgr = useContext(userCtx);
  const nav = useNavigate();
  const postId = useParams();

  const [objToRender, setObjToRender] = useState(postMgr.specPost);

  const fetchPost = async () => {
    await axios
      .get(`/api/v1/posts/${postId.id}`)
      .then((serverRes) => setObjToRender(serverRes.data))
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <main className={spec_classes.main}>
      <div className={classes.userBox}>
        <div
          className={classes.avatarBox}
          onClick={() => {
            nav(`/users/${objToRender.username}`);
          }}
        >
          <img className={classes.avatar} src={objToRender.avatar} />
          <p className={classes.username}>{objToRender.username}</p>
        </div>
        <div className={classes.voteBox}>
          <span
            className={
              objToRender.up_by.includes(userMgr.currentUser.username)
                ? classes.upvoted
                : classes.upvote
            }
            onClick={() => {
              return objToRender.up_by.includes(userMgr.currentUser.username)
                ? null
                : postMgr.onUpVote(objToRender._id, setObjToRender);
            }}
          >
            ⬆
          </span>
          <span className={classes.upvoteCount}>{objToRender.voteCount}</span>
        </div>
      </div>
      <img className={spec_classes.img} src={objToRender.url} />

      <h4 className={classes.title}>{objToRender.title}</h4>
      <p className={spec_classes.pContent}>{objToRender.content}</p>
      <div className={classes.pOptions}>
        <span className={classes.span}>more like this</span>
        <div className={classes.userOptions}>
          {objToRender.username === userMgr.currentUser.username && (
            <OptionBox username={objToRender.username} _id={objToRender._id} />
          )}
        </div>
      </div>
    </main>
  );
};

export default SpecPost;
