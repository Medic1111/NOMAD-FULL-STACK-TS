import { useEffect, useContext, useState } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import classes from "./Posts.module.css";
import beach from "../../assets/beach.jpg";
const Posts = () => {
  const authMgr = useContext(AuthCtx);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    authMgr.isTokenExp();
  }, []);

  return (
    <main className={classes.main}>
      <button
        className={classes.btnCreate}
        onClick={() => setShowForm((prev) => !prev)}
      >
        {!showForm ? "Create new" : "Cancel"}
      </button>
      {showForm && (
        <form>
          <input type="text" placeholder="Title" />
          <textarea placeholder="Content" />
          <input type="file" />
          <button type="submit">Post</button>
        </form>
      )}
      <ul className={classes.ul}>
        <li className={classes.li}>
          <div className={classes.userBox}>
            <div className={classes.avatarBox}>
              <img className={classes.avatar} src={beach} />
              <p className={classes.username}>Username</p>
            </div>
            <div className={classes.voteBox}>
              <span className={classes.upvote}>⬆️</span>
              <span className={classes.upvoteCount}>22</span>
            </div>
          </div>
          <img className={classes.img} src={beach} />

          <h4 className={classes.title}>Miami Beach</h4>
          <p className={classes.p}>
            Content substringed Content substringed Content substringed Content
            substringed Content substringed Content substringed
          </p>
        </li>
        {/*  */}
        <li className={classes.li}>
          <div className={classes.userBox}>
            <div className={classes.avatarBox}>
              <img className={classes.avatar} src={beach} />
              <p className={classes.username}>Username</p>
            </div>
            <div className={classes.voteBox}>
              <span className={classes.upvote}>⬆️</span>
              <span className={classes.upvoteCount}>22</span>
            </div>
          </div>
          <img className={classes.img} src={beach} />

          <h4 className={classes.title}>Miami Beach</h4>
          <p className={classes.p}>
            Content substringed Content substringed Content substringed Content
            substringed Content substringed Content substringed
          </p>
        </li>
        <li className={classes.li}>
          <div className={classes.userBox}>
            <div className={classes.avatarBox}>
              <img className={classes.avatar} src={beach} />
              <p className={classes.username}>Username</p>
            </div>
            <div className={classes.voteBox}>
              <span className={classes.upvote}>⬆️</span>
              <span className={classes.upvoteCount}>22</span>
            </div>
          </div>
          <img className={classes.img} src={beach} />

          <h4 className={classes.title}>Miami Beach</h4>
          <p className={classes.p}>
            Content substringed Content substringed Content substringed Content
            substringed Content substringed Content substringed
          </p>
        </li>
        <li className={classes.li}>
          <div className={classes.userBox}>
            <div className={classes.avatarBox}>
              <img className={classes.avatar} src={beach} />
              <p className={classes.username}>Username</p>
            </div>
            <div className={classes.voteBox}>
              <span className={classes.upvote}>⬆️</span>
              <span className={classes.upvoteCount}>22</span>
            </div>
          </div>
          <img className={classes.img} src={beach} />

          <h4 className={classes.title}>Miami Beach</h4>
          <p className={classes.p}>
            Content substringed Content substringed Content substringed Content
            substringed Content substringed Content substringed
          </p>
        </li>
      </ul>
    </main>
  );
};

export default Posts;
