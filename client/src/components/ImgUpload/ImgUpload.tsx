import classes from "./ImgUpload.module.css";
import axios from "axios";

interface Props {
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  url: string;
}

const ImgUpload: React.FC<Props> = ({ setUrl, url }) => {
  let formData: any;
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      formData = new FormData();
      formData.append("image", file);
      // console.log([...formData]);
    }
  };

  const submitFileHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await axios
      .post("/api/v1/upload", formData)
      .then((serverRes) => {
        setUrl(serverRes.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <form onSubmit={submitFileHandler}>
      <label className={classes.label}>
        <span className={`${classes.camera} material-symbols-outlined`}>
          photo_camera
        </span>

        <input
          value={""}
          onChange={handleChange}
          className={classes.input}
          type={"file"}
          accept="image/*"
        />
        <button className={classes.upload} value="Upload" type={"submit"}>
          {url === "" ? "Click to upload" : "Uploaded"}
        </button>
      </label>
    </form>
  );
};

export default ImgUpload;
