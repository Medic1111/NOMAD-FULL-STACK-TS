import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { PostTemplate } from "../models/user-models";
import { PostCtxType, PostDataType } from "../models/posts-models";
import { Post } from "../models/user-models";
import { userCtx } from "./user-ctx";
import { UiCtx } from "./ui-ctx";

export const PostCtx = createContext<PostCtxType>({
  displayPosts: [PostTemplate],
  setDisplayPosts: () => {},
  specPost: PostTemplate,
  setSpecPost: () => {},
  fetchSpecPost: (id: string, prevent: boolean) => {},
  onUpVote: (
    id: string,
    setObjToRender?: React.Dispatch<React.SetStateAction<Post>>
  ) => {},
  onDelPost: () => {},
  fetchPostApi: () => {},
  onCreateNewPost: (postData: PostDataType) => {},
  onEditPost: (id: string, oldData: Post) => {},
  postIdToEdit: "",
  setPostIdToEdit: () => {},
  onMoreLikeThis: (label: string) => {},
  isFiltering: false,
  setIsFiltering: () => {},
});

const PostsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const userMgr = useContext(userCtx);
  const uiMgr = useContext(UiCtx);

  const nav = useNavigate();
  const [displayPosts, setDisplayPosts] = useState([PostTemplate]);
  const [specPost, setSpecPost] = useState(PostTemplate);
  const [postIdToEdit, setPostIdToEdit] = useState("");
  const [isFiltering, setIsFiltering] = useState(false);

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

  const fetchSpecPost = async (id: string, prevent: boolean) => {
    await axios
      .get(`/api/v1/posts/${id}`)
      .then((serverRes) => {
        setSpecPost(serverRes.data);
        if (!prevent) {
          nav(`/posts/${id}`);
        }
      })
      .catch((err) => {
        // ADDRESS ERR BY GIVING USER FEEDBACK
        console.log(err);
      });
  };

  const onCreateNewPost = async (postData: PostDataType) => {
    let reqBody = {
      ...postData,
      username: userMgr.currentUser.username,
      avatar: userMgr.currentUser.avatar,
    };
    await axios
      .post("/api/v1/posts/new", reqBody)
      .then((serverRes) => {
        uiMgr.dispatch({ type: "CLOSE" });
      })
      .catch((err) => {
        // ADDRESS ERR BY GIVING USER FEEDBACK
        console.log(err);
      });
  };

  const onDelPost = async (username: string, _id: string) => {
    await axios
      .put(`/api/v1/${username}/posts/delete/${_id}`)
      .then((serverRes) => {
        fetchPostApi();
        nav("/posts");
      })
      .catch((err) => {
        // ADDRESS ERR BY GIVING FEEDBACK
        console.log(err);
      });
  };

  const onUpVote = async (
    id: string,
    setObjToRender?: React.Dispatch<React.SetStateAction<Post>>
  ) => {
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

  const onEditPost = async (id: string, oldData: Post) => {
    await axios
      .patch(
        `/api/v1/${userMgr.currentUser.username}/posts/${id}/edit`,
        oldData
      )
      .then((serverRes) => {
        fetchPostApi();
        uiMgr.dispatch({ type: "CLOSE" });
        nav("/posts");
      })
      .catch((err) => console.log(err));
  };

  const onMoreLikeThis = async (label: string) => {
    await axios
      .get(`/api/v1/posts/morelikethis/${label}/`)
      .then((serverRes) => {
        setIsFiltering(true);
        serverRes.data.reverse();
        setDisplayPosts(serverRes.data);
        nav("/posts");
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
        specPost,
        setSpecPost,
        onDelPost,
        fetchPostApi,
        onCreateNewPost,
        onUpVote,
        onEditPost,
        postIdToEdit,
        setPostIdToEdit,
        onMoreLikeThis,
        isFiltering,
        setIsFiltering,
      }}
    >
      {children}
    </PostCtx.Provider>
  );
};

export default PostsProvider;
