import classes from "./Hero.module.css";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthCtx } from "../../features/auth-ctx";

const Hero = () => {
  const nav = useNavigate();
  const authMgr = useContext(AuthCtx);

  authMgr.isAuth && nav("/posts");

  const takeToLogin = () => {
    authMgr.setShowLogin(true);
    authMgr.isAuth ? nav("/posts") : nav("/auth");
  };

  const takeToSignup = () => {
    authMgr.setShowLogin(false);
    authMgr.isAuth ? nav("/posts") : nav("/auth");
  };

  return (
    <>
      <div className={classes.parallax}>
        <header className={classes.header}>
          <h1 className={classes.h1}>NOMAD ME</h1>
        </header>
      </div>
      <article className={classes.article}>
        <h2 className={classes.h2}>Welcome Wanderer!</h2>
        <p className={classes.p}>
          Are you free-spirited, untamable, who simply won't stop until all
          that's there to be seen gets seen? You have found your place!
          Non-toxic community filled with people who love to unsettle and share
          their experiences!
        </p>
        <div className={classes.btnBox}>
          <button onClick={takeToSignup} className={classes.btn}>
            Sign Up
          </button>
          <button onClick={takeToLogin} className={classes.btn}>
            Login
          </button>
        </div>
      </article>
    </>
  );
};

export default Hero;
