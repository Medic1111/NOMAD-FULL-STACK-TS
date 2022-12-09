import axios from "axios";
import { useState, useContext } from "react";
import { userCtx } from "../../features/user-ctx";
import classes from "./AvatarForm.module.css";

const AvatarForm = (setShowEdit) => {
  const userMgr = useContext(userCtx);
  const [newUrl, setNewUrl] = useState("");

  const onUpdateAvatar = async (e) => {
    e.preventDefault();
    console.log(newUrl);
    await axios
      .put(`/api/v1/${userMgr.currentUser.username}/avatar`, { newUrl })
      .then((serverRes) => {
        localStorage.setItem(
          "userValidation",
          JSON.stringify({
            avatar: newUrl,
          })
        );
        // THIS TRIGGERS A REDIRECT TO AUTH
        // TO GENERATE A NEW TOKEN
      })
      .catch((err) => console.log(err));
  };

  return (
    <form className={classes.form}>
      <h3 className={classes.h3}>Edit Profile Picture</h3>
      <input
        className={classes.input}
        type="text"
        placeholder="New Image URL"
        value={newUrl}
        onChange={(e) => {
          setNewUrl(e.target.value);
        }}
      />
      <input
        onClick={onUpdateAvatar}
        className={classes.inputBtn}
        type="submit"
        value="Update"
      />
      <button className={classes.inputBtn} onClick={() => setShowEdit(false)}>
        Cancel
      </button>
    </form>
  );
};

export default AvatarForm;
