import { useEffect, useContext, useState, useRef } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { userCtx } from "../../features/user-ctx";
import { PostCtx } from "../../features/posts-ctx";
import classes from "./Posts.module.css";
import PostItem from "../../components/PostItem/PostItem";

const Posts = () => {
  const authMgr = useContext(AuthCtx);
  const userMgr = useContext(userCtx);
  const postsMgr = useContext(PostCtx);
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    authMgr.isTokenExp();
  }, []);

  // Check if auth, redirect here to clear lint

  return (
    <main className={classes.main}>
      <aside className={classes.aside}>
        <p className={classes.welcome}>Welcome {userMgr.currentUser}</p>
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
        {postsMgr.displayPosts.map((obj, index) => {
          return (
            <PostItem
              id={index}
              key={`POST_${index}`}
              avatar={obj.avatar}
              username={obj.username}
              voteCount={obj.voteCount}
              title={obj.title}
              content={obj.content}
              url={obj.url}
            />
          );
        })}
      </ul>
    </main>
  );
};

export default Posts;
