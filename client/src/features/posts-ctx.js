import { createContext, useState } from "react";
import dummyData from "../data/dummy";
import { useNavigate } from "react-router-dom";

export const PostCtx = createContext({
  displayPosts: dummyData,
  setDisplayPosts: () => {},
  fetchPost: (id) => {},
  specificPost: {},
  setSpecificPost: () => {},
});

const PostsProvider = (props) => {
  const nav = useNavigate();
  const [displayPosts, setDisplayPosts] = useState(dummyData);

  const fetchPost = (id) => {
    nav(`/posts/${id}`);
  };

  return (
    <PostCtx.Provider
      value={{
        displayPosts,
        setDisplayPosts,
        fetchPost,
      }}
    >
      {props.children}
    </PostCtx.Provider>
  );
};

export default PostsProvider;
