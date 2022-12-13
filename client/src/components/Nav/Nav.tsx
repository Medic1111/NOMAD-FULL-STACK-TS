import classes from "./Nav.module.css";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { authCtx } from "../../features/auth-ctx";
import { userCtx } from "../../features/user-ctx";

const Nav: React.FC = () => {
  const authMgr = useContext(authCtx);
  const userMgr = useContext(userCtx);

  return (
    <nav className={classes.nav}>
      {authMgr.isAuth ? (
        <>
          <Link className={classes.link} to="/posts">
            Posts
          </Link>
          <Link
            className={classes.link}
            to={`/users/${userMgr.currentUser.username}`}
          >
            Profile
          </Link>
          <li className={classes.link} onClick={() => authMgr.logoutHandler()}>
            Logout
          </li>
        </>
      ) : (
        <>
          <li
            onClick={() => authMgr.onShowForm(false)}
            className={classes.link}
          >
            Sign Up
          </li>
          <li onClick={() => authMgr.onShowForm(true)} className={classes.link}>
            Login
          </li>
        </>
      )}
    </nav>
  );
};

export default Nav;
