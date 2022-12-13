import classes from "./MoreLikeThis.module.css";
import { useContext } from "react";
import { PostCtx } from "../../features/posts-ctx";

const MoreLikeThis: React.FC<{ label: string }> = ({ label }) => {
  const postsMgr = useContext(PostCtx);

  return (
    <>
      {!postsMgr.isFiltering ? (
        <span
          className={classes.span}
          onClick={() => postsMgr.onMoreLikeThis(label)}
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
          x {label}
        </span>
      )}
    </>
  );
};

export default MoreLikeThis;
