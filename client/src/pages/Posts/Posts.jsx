import { useEffect, useContext, useState, useRef } from "react";
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
      <aside className={classes.aside}>
        <form className={classes.searchForm}>
          <input
            className={classes.searchBar}
            type="text"
            placeholder="Search"
          />
          <button className={classes.searchBtn} type="submit">
            Search
          </button>
        </form>
        <button
          className={classes.btnCreate}
          onClick={() => setShowForm((prev) => !prev)}
        >
          {!showForm ? "+" : "-"}
        </button>
      </aside>
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
            subs
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
