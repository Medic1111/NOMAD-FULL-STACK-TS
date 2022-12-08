import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const PostCtx = createContext({
  displayPosts: [],
  setDisplayPosts: () => {},
  fetchSpecPost: (id) => {},
  fetchPostApi: () => {},
  specPost: {},
  setSpecPost: () => {},
});

const PostsProvider = (props) => {
  const nav = useNavigate();
  const [displayPosts, setDisplayPosts] = useState([]);
  const [specPost, setSpecPost] = useState({});

  const fetchPostApi = async () => {
    await axios
      .get("/api/v1/posts")
      .then((serverRes) => {
        serverRes.data.reverse();
        setDisplayPosts(serverRes.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchSpecPost = async (id) => {
    await axios
      .get(`/api/v1/posts/${id}`)
      .then((serverRes) => {
        setSpecPost(serverRes.data);
        nav(`/posts/${id}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PostCtx.Provider
      value={{
        displayPosts,
        setDisplayPosts,
        fetchSpecPost,
        fetchPostApi,
        specPost,
        setSpecPost,
      }}
    >
      {props.children}
    </PostCtx.Provider>
  );
};

export default PostsProvider;
