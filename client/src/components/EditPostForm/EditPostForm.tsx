import classes from "../NewPostForm/NewPostForm.module.css";
import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Post, PostTemplate } from "../../models/user-models";
import { PostCtx } from "../../features/posts-ctx";
import { UiCtx } from "../../features/ui-ctx";
import Label from "../Label/Label";
import ReactQuill from "react-quill";
import ImgUpload from "../ImgUpload/ImgUpload";

const EditPostForm: React.FC = () => {
  const postMgr = useContext(PostCtx);
  const uiMgr = useContext(UiCtx);

  const [oldData, setOldData] = useState<Post>(PostTemplate);
  const [label, setLabel] = useState("none");
  const [content, setContent] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const fetchPost = async () => {
    await axios
      .get(`/api/v1/posts/${postMgr.postIdToEdit}`)
      .then((serverRes) => {
        setContent(serverRes.data.content);
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
    postMgr.onEditPost(postMgr.postIdToEdit, {
      ...oldData,
      label,
      content,
      url: newUrl,
    });
  };

  return (
    <article className={`${classes.article} flex_col_center`}>
      <ImgUpload setUrl={setNewUrl} url={newUrl} />
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
        <ReactQuill
          className={`${classes.textArea} input_standard`}
          theme="snow"
          value={content}
          onChange={setContent}
        />

        <Label label={label} setLabel={setLabel} />
        <input
          disabled={newUrl === "" ? true : false}
          value="Edit post"
          className={
            newUrl === ""
              ? `${classes.disabled} btn_standard`
              : `${classes.submitBtn} btn_standard`
          }
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
    </article>
  );
};

export default EditPostForm;
