import classes from "./Hero.module.css";
import { useContext } from "react";
import { Zoom, Slide } from "react-awesome-reveal";
import { authCtx } from "../../features/auth-ctx";

const Hero: React.FC = () => {
  const authMgr = useContext(authCtx);

  return (
    <>
      <div className={classes.parallax}>
        <header className={classes.header}>
          <Zoom>
            <h1 className={classes.h1}>NOMAD ME</h1>
          </Zoom>
        </header>
      </div>
      <article className={classes.article}>
        <h2 className={classes.h2}>Welcome Wanderer!</h2>
        <Slide cascade className={classes.test}>
          <p className={classes.p}>
            Are you free-spirited, untamable individual, who simply won't stop
            until all that's there to be seen gets seen? You have found your
            place! Non-toxic community filled with people who love to unsettle
            and share their experiences!{" "}
          </p>
        </Slide>

        <div className={classes.btnBox}>
          <button
            onClick={() => authMgr.onShowForm(false)}
            className={classes.btn}
          >
            Sign Up
          </button>
          <button
            onClick={() => authMgr.onShowForm(true)}
            className={classes.btn}
          >
            Login
          </button>
        </div>
      </article>
    </>
  );
};

export default Hero;
