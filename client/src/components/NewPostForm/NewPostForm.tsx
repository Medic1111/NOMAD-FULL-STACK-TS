import classes from "./NewPostForm.module.css";
import { useState, useContext } from "react";
import { PostCtx } from "../../features/posts-ctx";
import { UiCtx } from "../../features/ui-ctx";
import Label from "../Label/Label";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ImgUpload from "../ImgUpload/ImgUpload";

const NewPostForm: React.FC = () => {
  const postMgr = useContext(PostCtx);
  const uiMgr = useContext(UiCtx);

  const [label, setLabel] = useState("none");
  const [content, setContent] = useState("");
  const [url, setUrl] = useState("");
  const [postData, setPostData] = useState({
    title: "",
  });

  const onInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setPostData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleCreatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postMgr.onCreateNewPost({ ...postData, label, content, url: url });
  };

  return (
    <article className={`${classes.article} flex_col_center`}>
      <ImgUpload setUrl={setUrl} url={url} />
      <form
        onSubmit={handleCreatePost}
        className={`${classes.form} flex_col_center`}
      >
        <input
          name="title"
          value={postData.title}
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
          disabled={url === "" ? true : false}
          value="post"
          className={
            url === ""
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
          cancel
        </button>
      </form>
    </article>
  );
};

export default NewPostForm;
