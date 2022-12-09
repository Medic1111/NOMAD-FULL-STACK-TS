import { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userCtx } from "./user-ctx";

export const PostCtx = createContext({
  displayPosts: [],
  setDisplayPosts: () => {},
  fetchSpecPost: (id) => {},
  fetchPostApi: () => {},
  specPost: {},
  setSpecPost: () => {},
  onCreateNewPost: () => {},
  onDelPost: () => {},
  onUpVote: (id, obj) => {},
});

const PostsProvider = (props) => {
  const userMgr = useContext(userCtx);
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
        // ADDRESS ERR BY GIVING USER FEEDBACK
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
        // ADDRESS ERR BY GIVING USER FEEDBACK

        console.log(err);
      });
  };

  const onCreateNewPost = async (postData, setShowForm) => {
    let reqBody = {
      ...postData,
      username: userMgr.currentUser.username,
      avatar: userMgr.currentUser.avatar,
    };
    await axios
      .post("/api/v1/posts/new", reqBody)
      .then((serverRes) => {
        console.log(serverRes.data);

        setShowForm(false);
      })
      .catch((err) => {
        // ADDRESS ERR BY GIVING USER FEEDBACK

        console.log(err);
      });
  };

  const onDelPost = async (username, id) => {
    console.log(username, id);
    await axios
      .put(`/api/v1/${username}/posts/delete/${id}`)
      .then((serverRes) => {
        fetchPostApi();
        nav("/posts");
      })
      .catch((err) => {
        // ADDRESS ERR BY GIVING FEEDBACK
        console.log(err);
      });
  };

  const onUpVote = async (id, setObjToRender) => {
    await axios
      .patch(`/api/v1/${userMgr.currentUser.username}/posts/${id}/upvote`)
      .then((serverRes) => {
        fetchPostApi();
        if (setObjToRender) {
          setObjToRender(serverRes.data);
        }
      })
      .catch((err) => {
        // ADDRESS ERR BY GIVING FEEDBACK

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
        onCreateNewPost,
        onDelPost,
        onUpVote,
      }}
    >
      {props.children}
    </PostCtx.Provider>
  );
};

export default PostsProvider;
