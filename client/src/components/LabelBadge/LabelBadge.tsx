import { useContext, useEffect, useState } from "react";
import { PostCtx } from "../../features/posts-ctx";
import classes from "./LabelBadge.module.css";
import { useNavigate } from "react-router-dom";

const LabelBadge: React.FC = () => {
  const postMgr = useContext(PostCtx);
  const nav = useNavigate();

  const [content, setContent] = useState("toggle_on");
  const [bgColor, setBgColor] = useState<string>();

  useEffect(() => {
    const setBackground = () => {
      switch (postMgr.labelToDisplay) {
        case "none": {
          return setBgColor("#dfd3c3");
        }
        case "green": {
          return setBgColor("#cbf078");
        }
        case "blue": {
          return setBgColor("#66bfbf");
        }
        case "orange": {
          return setBgColor("#ff9a3c");
        }
        case "brown": {
          return setBgColor("#83580b");
        }
        case "gray": {
          return setBgColor("#596e79");
        }
      }
    };
    setBackground();
  }, [postMgr.labelToDisplay]);

  return (
    <span
      style={{ backgroundColor: bgColor }}
      className={`${classes.labelBadge} material-symbols-outlined`}
      onClick={() => {
        postMgr.setIsFiltering(false);
        postMgr.fetchPostApi();
        nav("/posts");
      }}
      onMouseEnter={() => setContent("toggle_off")}
      onMouseLeave={() => setContent("toggle_on")}
    >
      {content}
    </span>
  );
};

export default LabelBadge;
