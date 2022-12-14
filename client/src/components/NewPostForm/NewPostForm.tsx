import classes from "./NewPostForm.module.css";
import { useState, useContext } from "react";
import { PostCtx } from "../../features/posts-ctx";
import { UiCtx } from "../../features/ui-ctx";
import Label from "../Label/Label";

const NewPostForm: React.FC = () => {
  const postMgr = useContext(PostCtx);
  const uiMgr = useContext(UiCtx);

  const [label, setLabel] = useState("none");
  const [postData, setPostData] = useState({
    title: "",
    content: "",
    url: "",
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
    postMgr.onCreateNewPost({ ...postData, label });
  };

  return (
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
      <textarea
        name="content"
        value={postData.content}
        onChange={onInputChange}
        className={`${classes.textArea} input_standard`}
        placeholder="Content"
        maxLength={400}
        rows={27}
        required
      />

      <input
        name="url"
        value={postData.url}
        onChange={onInputChange}
        className={`${classes.input} input_standard`}
        type="text"
        placeholder="Img Url"
        required
      />
      <Label label={label} setLabel={setLabel} />
      <input
        value="post"
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
        cancel
      </button>
    </form>
  );
};

export default NewPostForm;
