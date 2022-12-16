import classes from "../NewPostForm/NewPostForm.module.css";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Post, PostTemplate } from "../../models/user-models";
import { PostCtx } from "../../features/posts-ctx";
import { UiCtx } from "../../features/ui-ctx";
import Label from "../Label/Label";

const EditPostForm: React.FC = () => {
  const postMgr = useContext(PostCtx);
  const uiMgr = useContext(UiCtx);
  const [oldData, setOldData] = useState<Post>(PostTemplate);
  const [label, setLabel] = useState("none");

  const fetchPost = async () => {
    await axios
      .get(`/api/v1/posts/${postMgr.postIdToEdit}`)
      .then((serverRes) => {
        setOldData(serverRes.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  const onInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setOldData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleEditPost = async (e: React.FormEvent<HTMLElement>) => {
    e.preventDefault();
    postMgr.onEditPost(postMgr.postIdToEdit, { ...oldData, label });
  };

  return (
    <form
      onSubmit={handleEditPost}
      className={`${classes.form} flex_col_center`}
    >
      <input
        name="title"
        value={oldData.title}
        onChange={onInputChange}
        className={`${classes.input} input_standard`}
        type="text"
        placeholder="Title"
        maxLength={20}
        required
      />
      <textarea
        name="content"
        value={oldData.content}
        onChange={onInputChange}
        className={`${classes.textArea} input_standard`}
        placeholder="Content"
        maxLength={1000}
        rows={27}
        required
      />

      <input
        name="url"
        value={oldData.url}
        onChange={() => onInputChange}
        className={`${classes.input} input_standard`}
        type="text"
        placeholder="Img Url"
        required
      />
      <Label label={label} setLabel={setLabel} />
      <input
        value="Edit post"
        className={`${classes.submitBtn} btn_standard`}
        type="submit"
      />
      <button
        className={`${classes.submitBtn} btn_standard`}
        onClick={(e) => {
          e.preventDefault();
          uiMgr.dispatch({ type: "CLOSE" });
        }}
      >
        Cancel
      </button>
    </form>
  );
};

export default EditPostForm;
