import { Link } from "react-router-dom";
import classes from "./Nav.module.css";
import { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";

const Nav = () => {
  const authMgr = useContext(AuthCtx);

  return (
    <nav className={classes.nav}>
      <Link className={classes.link} to="/">
        Home
      </Link>
      <Link onClick={authMgr.verifyToken} className={classes.link} to="/posts">
        Posts
      </Link>
      {authMgr.isAuth || (
        <Link
          onClick={() => authMgr.setShowLogin(false)}
          className={classes.link}
          to="/auth"
        >
          Sign Up
        </Link>
      )}
      {authMgr.isAuth || (
        <Link
          onClick={() => authMgr.setShowLogin(true)}
          className={classes.link}
          to="/auth"
        >
          Login
        </Link>
      )}
      {authMgr.isAuth && (
        <Link onClick={authMgr.logoutHandler} className={classes.link} to="/">
          Logout
        </Link>
      )}
    </nav>
  );
};

export default Nav;
