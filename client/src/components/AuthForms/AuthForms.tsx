import classes from "./AuthForms.module.css";
import { useContext } from "react";
import { Slide } from "react-awesome-reveal";
import { authCtx } from "../../features/auth-ctx";

const AuthForms = () => {
  const authMgr = useContext(authCtx);

  return (
    <Slide className={classes.formBox}>
      <form onSubmit={(e) => authMgr.onSubmit(e)} className={classes.form}>
        <h3 className={classes.h3}>
          {authMgr.showLogin ? "LOGIN" : "SIGN UP"}
        </h3>
        {authMgr.showLogin || (
          <>
            <label className={classes.label} htmlFor="username">
              Email
            </label>

            <input
              className={classes.input}
              type="email"
              id="email"
              name="email"
              value={authMgr.formData.email}
              onChange={(e) => authMgr.onInputChange(e)}
              maxLength={50}
              required
            />
          </>
        )}
        <label className={classes.label} htmlFor="username">
          Username
        </label>
        <input
          className={classes.input}
          type="text"
          id="username"
          name="username"
          value={authMgr.formData.username}
          onChange={(e) => authMgr.onInputChange(e)}
          maxLength={14}
          required
        />
        <label className={classes.label} htmlFor="password">
          Password
        </label>
        <input
          className={classes.input}
          type="password"
          id="password"
          name="password"
          value={authMgr.formData.password}
          onChange={(e) => authMgr.onInputChange(e)}
          required
        />
        {authMgr.showLogin || (
          <>
            <label className={classes.label} htmlFor="avatar">
              Profile Picture
            </label>
            <input
              className={classes.input}
              type="text"
              id="text"
              name="avatar"
              value={authMgr.formData.avatar}
              onChange={(e) => authMgr.onInputChange(e)}
            />
          </>
        )}
        {authMgr.showFeedback && <p className={classes.p}>{authMgr.feedMsg}</p>}

        <input
          className={classes.btn}
          type="submit"
          value={authMgr.showLogin ? "Login" : "Sign Up"}
        />
      </form>
    </Slide>
  );
};

export default AuthForms;
