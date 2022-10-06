import { useEffect, useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";

const Posts = () => {
  const authMgr = useContext(AuthCtx);

  useEffect(() => {
    authMgr.isTokenExp();
  }, []);

  return (
    <>
      <p>Posts</p>
    </>
  );
};

export default Posts;
