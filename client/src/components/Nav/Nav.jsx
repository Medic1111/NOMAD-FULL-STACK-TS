import { Link } from "react-router-dom";
import classes from "./Nav.module.css";
import { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import { userCtx } from "../../features/user-ctx";

const Nav = () => {
  const authMgr = useContext(AuthCtx);
  const userMgr = useContext(userCtx);
  return (
    <nav className={classes.nav}>
      <Link className={classes.link} to="/">
        Home
      </Link>
      <Link onClick={authMgr.verifyToken} className={classes.link} to="/posts">
        Posts
      </Link>
      {authMgr.isAuth || (
        <>
          <Link
            onClick={() => authMgr.setShowLogin(false)}
            className={classes.link}
            to="/auth"
          >
            Sign Up
          </Link>

          <Link
            onClick={() => authMgr.setShowLogin(true)}
            className={classes.link}
            to="/auth"
          >
            Login
          </Link>
        </>
      )}
      {authMgr.isAuth && (
        <>
          <Link className={classes.link} to={`/users/${userMgr.currentUser}`}>
            Profile
          </Link>
          <Link onClick={authMgr.logoutHandler} className={classes.link} to="/">
            Logout
          </Link>
        </>
      )}
    </nav>
  );
};

export default Nav;
