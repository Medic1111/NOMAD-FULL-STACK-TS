import classes from "./NewPostForm.module.css";
import axios from "axios";
import { useState, useContext } from "react";
import { userCtx } from "../../features/user-ctx";

const NewPostForm = () => {
  const userMgr = useContext(userCtx);

  const [postData, setPostData] = useState({
    title: "",
    content: "",
    url: "",
  });

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setPostData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // ADD THIS TO POST CONTEXT

  const handleCreatePost = async (e) => {
    e.preventDefault();
    let reqBody = {
      ...postData,
      username: userMgr.currentUser.username,
      avatar: userMgr.currentUser.avatar,
    };
    await axios
      .post("/api/v1/posts/new", reqBody)
      .then((serverRes) => {
        console.log(serverRes.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <form onSubmit={handleCreatePost} className={classes.form}>
      <input
        name="title"
        value={postData.title}
        onChange={onInputChange}
        className={classes.input}
        type="text"
        placeholder="Title"
      />
      <textarea
        name="content"
        value={postData.content}
        onChange={onInputChange}
        className={classes.textArea}
        placeholder="Content"
        rows={27}
      />
      {/* <label className={classes.fileWrapper}>
        Select Picture
        <input className={classes.file} type="file" />
      </label> */}
      <input
        name="url"
        value={postData.url}
        onChange={onInputChange}
        className={classes.input}
        type="text"
        placeholder="Img Url"
      />
      <input value="post" className={classes.submitBtn} type="submit" />
    </form>
  );
};

export default NewPostForm;
