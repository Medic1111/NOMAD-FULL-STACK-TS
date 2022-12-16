import classes from "../../components/PostItem/PostItem.module.css";
import spec_classes from "./SpecPost.module.css";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import OptionBox from "../../components/OptionBox/OptionBox";
import { PostCtx } from "../../features/posts-ctx";
import { userCtx } from "../../features/user-ctx";
import MoreLikeThis from "../../components/MoreLikeThis/MoreLikeThis";
import { UiCtx } from "../../features/ui-ctx";
import Vote from "../../components/Vote/Vote";

const SpecPost: React.FC = () => {
  const postMgr = useContext(PostCtx);
  const userMgr = useContext(userCtx);
  const uiMgr = useContext(UiCtx);
  const nav = useNavigate();
  const postId = useParams();

  const [objToRender, setObjToRender] = useState(postMgr.specPost);

  const fetchPost = async () => {
    uiMgr.dispatch({ type: "LOADING" });
    await axios
      .get(`/api/v1/posts/${postId.id}`)
      .then((serverRes) => {
        setObjToRender(serverRes.data);
        uiMgr.dispatch({ type: "CLOSE" });
      })
      .catch((err) => {
        console.log(err);
        uiMgr.dispatch({ type: "CLOSE" });
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <main className={`${spec_classes.main} flex_col_center`}>
      <div className={spec_classes.userBox}>
        <div
          className={classes.avatarBox}
          onClick={() => {
            nav(`/users/${objToRender.username}`);
          }}
        >
          <img className={classes.avatar} src={objToRender.avatar} />
          <p className={classes.username}>{objToRender.username}</p>
        </div>
        <Vote obj={objToRender} setObjToRender={setObjToRender} />
      </div>
      <img className={spec_classes.img} src={objToRender.url} />
      <h4 className={classes.title}>{objToRender.title}</h4>
      <p className={spec_classes.pContent}>{objToRender.content}</p>
      <div className={spec_classes.pOptions}>
        <MoreLikeThis label={objToRender.label} />
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
