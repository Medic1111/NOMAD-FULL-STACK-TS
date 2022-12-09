import classes from "./Posts.module.css";
import { useEffect, useContext, useState, useRef } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { userCtx } from "../../features/user-ctx";
import { PostCtx } from "../../features/posts-ctx";
import PostItem from "../../components/PostItem/PostItem";
import SearchForm from "../../components/SearchForm/SearchForm";
import NewPostForm from "../../components/NewPostForm/NewPostForm";

const Posts = () => {
  const authMgr = useContext(AuthCtx);
  const userMgr = useContext(userCtx);
  const postsMgr = useContext(PostCtx);

  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    authMgr.isTokenExp();
    postsMgr.fetchPostApi();
  }, [showForm]);

  return (
    <main className={classes.main}>
      <aside className={classes.aside}>
        <p className={classes.welcome}>
          Welcome {userMgr.currentUser.username}
        </p>

        <SearchForm />
        <button
          className={classes.btnCreate}
          onClick={() => setShowForm((prev) => !prev)}
        >
          {!showForm ? "+" : "-"}
        </button>
      </aside>
      {showForm && <NewPostForm setShowForm={setShowForm} />}
      <ul className={classes.ul}>
        {postsMgr.displayPosts.map((obj, index) => {
          return (
            <PostItem
              id={obj._id}
              key={`POST_${index}`}
              avatar={obj.avatar}
              username={obj.username}
              voteCount={obj.voteCount}
              title={obj.title}
              content={obj.content}
              url={obj.url}
              up_by={obj.up_by}
            />
          );
        })}
      </ul>
    </main>
  );
};

export default Posts;
