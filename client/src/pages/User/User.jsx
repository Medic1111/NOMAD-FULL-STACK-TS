import { useContext, useEffect } from "react";
import { userCtx } from "../../features/user-ctx";
import { useParams } from "react-router-dom";
const User = () => {
  const userMgr = useContext(userCtx);
  const userId = useParams();

  useEffect(() => {
    return userMgr.fetchUser(userId.id);
  }, []);

  return (
    <main>
      <h1>{userMgr.userProfile.username}</h1>
      <p>total posts: {userMgr.userProfile.totalPosts}</p>
    </main>
  );
};

export default User;
