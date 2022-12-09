import classes from "../NewPostForm/NewPostForm.module.css";
import spec_classes from "./EditPostForm.module.css";
import { useState, useContext, useEffect } from "react";
import { PostCtx } from "../../features/posts-ctx";
import axios from "axios";

const EditPostForm = ({ setShowEditPost, id }) => {
  const postMgr = useContext(PostCtx);
  const [oldData, setOldData] = useState({});

  const fetchPost = async () => {
    await axios
      .get(`/api/v1/posts/${id}`)
      .then((serverRes) => setOldData(serverRes.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    setOldData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleEditPost = async (e) => {
    e.preventDefault();
    postMgr.onEditPost(id, oldData, setShowEditPost);
  };

  return (
    <form onSubmit={handleEditPost} className={spec_classes.form}>
      <input
        name="title"
        value={oldData.title}
        onChange={onInputChange}
        className={classes.input}
        type="text"
        placeholder="Title"
        maxLength={"20"}
        required
      />
      <textarea
        name="content"
        value={oldData.content}
        onChange={onInputChange}
        className={classes.textArea}
        placeholder="Content"
        maxLength={"400"}
        rows={27}
        required
      />

      <input
        name="url"
        value={oldData.url}
        onChange={onInputChange}
        className={classes.input}
        type="text"
        placeholder="Img Url"
        required
      />
      <input value="Edit post" className={classes.submitBtn} type="submit" />
      <button
        className={classes.submitBtn}
        onClick={(e) => {
          e.preventDefault();
          setShowEditPost(false);
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditPostForm;
