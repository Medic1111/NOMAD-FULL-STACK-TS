import { createContext, useState } from "react";
import dummyData from "../data/dummy";
export const PostCtx = createContext({
  displayPosts: dummyData,
  setDisplayPosts: () => {},
});

const PostsProvider = (props) => {
  const [displayPosts, setDisplayPosts] = useState(dummyData);

  return (
    <PostCtx.Provider
      value={{
        displayPosts,
        setDisplayPosts,
      }}
    >
      {props.children}
    </PostCtx.Provider>
  );
};

export default PostsProvider;
