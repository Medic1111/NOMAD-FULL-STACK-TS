import { useContext } from "react";
import { PostCtx } from "../../features/posts-ctx";
import classes from "./LabelBadge.module.css";
import { useNavigate } from "react-router-dom";

const LabelBadge: React.FC = () => {
  const postMgr = useContext(PostCtx);
  const nav = useNavigate();

  return (
    <span
      style={{
        backgroundColor:
          postMgr.labelToDisplay !== "none"
            ? `${postMgr.labelToDisplay}`
            : "white",
      }}
      className={`${classes.labelBadge} material-symbols-outlined`}
      onClick={() => {
        postMgr.setIsFiltering(false);
        postMgr.fetchPostApi();
        nav("/posts");
      }}
    >
      sell <span className={classes.x}>x</span>
    </span>
  );
};

export default LabelBadge;
