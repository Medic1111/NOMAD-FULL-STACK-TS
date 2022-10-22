import { useContext, useEffect } from "react";
import { PostCtx } from "../../features/posts-ctx";

const SpecPost = () => {
  const postMgr = useContext(PostCtx);

  // useEffect(()=>{
  // call to api to spec post
  // via context
  // }, [])

  return (
    <main>
      <h1>{""}</h1>
      <p>test</p>
    </main>
  );
};

export default SpecPost;
