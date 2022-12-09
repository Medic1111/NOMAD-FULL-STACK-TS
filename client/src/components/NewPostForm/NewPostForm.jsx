import classes from "./NewPostForm.module.css";
import { useState, useContext } from "react";
import { PostCtx } from "../../features/posts-ctx";

const NewPostForm = ({ setShowForm }) => {
  const postMgr = useContext(PostCtx);

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

  const handleCreatePost = async (e) => {
    e.preventDefault();
    postMgr.onCreateNewPost(postData, setShowForm);
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
        maxLength={"20"}
        required
      />
      <textarea
        name="content"
        value={postData.content}
        onChange={onInputChange}
        className={classes.textArea}
        placeholder="Content"
        maxLength={"400"}
        rows={27}
        required
      />

      <input
        name="url"
        value={postData.url}
        onChange={onInputChange}
        className={classes.input}
        type="text"
        placeholder="Img Url"
        required
      />
      <input value="post" className={classes.submitBtn} type="submit" />
    </form>
  );
};

export default NewPostForm;
