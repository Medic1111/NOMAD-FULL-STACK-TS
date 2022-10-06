import classes from "../Login/Login.module.css";
import { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";

const Signup = () => {
  const authMgr = useContext(AuthCtx);

  const submitHandler = (e) => {
    e.preventDefault();
    authMgr.submitForm("register");
  };
  return (
    <div className={classes.formBox}>
      <form onSubmit={submitHandler} className={classes.form}>
        <h3 className={classes.h3}>SIGN UP</h3>
        <label className={classes.label} htmlFor="username">
          Email
        </label>
        <input
          value={authMgr.userInfo.email}
          className={classes.input}
          type="email"
          id="email"
          name="email"
          onChange={authMgr.onInputChange}
        />
        <label className={classes.label} htmlFor="username">
          Username
        </label>
        <input
          className={classes.input}
          type="text"
          id="username"
          name="username"
          value={authMgr.userInfo.username}
          onChange={authMgr.onInputChange}
        />
        <label className={classes.label} htmlFor="password">
          Password
        </label>
        <input
          className={classes.input}
          type="password"
          id="password"
          name="password"
          value={authMgr.userInfo.password}
          onChange={authMgr.onInputChange}
        />
        {authMgr.showFeedback && <p className={classes.p}>{authMgr.feedMsg}</p>}

        <input className={classes.btn} type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default Signup;
