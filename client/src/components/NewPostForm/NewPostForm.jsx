import classes from "./NewPostForm.module.css";

const NewPostForm = () => {
  return (
    <form className={classes.form}>
      <input className={classes.input} type="text" placeholder="Title" />
      <textarea className={classes.textArea} placeholder="Content" rows={27} />
      <label className={classes.fileWrapper}>
        Select Picture
        <input className={classes.file} type="file" />
      </label>
      <button className={classes.submitBtn} type="submit">
        Post
      </button>
    </form>
  );
};

export default NewPostForm;
