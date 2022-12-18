import classes from "./AuthForms2.module.css";
import { useContext } from "react";
import { Slide } from "react-awesome-reveal";
import { authCtx } from "../../features/auth-ctx";

const AuthForms = () => {
  const authMgr = useContext(authCtx);

  return (
    <Slide className={`${classes.formBox} flex_center`}>
      <form
        onSubmit={(e) => authMgr.onSubmit(e)}
        className={`${classes.form} flex_col_center`}
      >
        <h3 className={classes.h3}>
          {authMgr.showLogin ? "LOGIN" : "SIGN UP"}
        </h3>
        {authMgr.showLogin || (
          <>
            <label className={`label_standard`} htmlFor="username">
              Email
            </label>

            <input
              className={`${classes.input} input_standard`}
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
        <label className={`label_standard`} htmlFor="username">
          Username
        </label>
        <input
          className={`${classes.input} input_standard`}
          type="text"
          id="username"
          name="username"
          value={authMgr.formData.username}
          onChange={(e) => authMgr.onInputChange(e)}
          maxLength={14}
          required
        />
        <label className={`label_standard`} htmlFor="password">
          Password
        </label>
        <input
          className={`${classes.input} input_standard`}
          type="password"
          id="password"
          name="password"
          value={authMgr.formData.password}
          onChange={(e) => authMgr.onInputChange(e)}
          required
        />
        {authMgr.showLogin || (
          <>
            <label className={`label_standard`} htmlFor="avatar">
              Profile Picture
            </label>
            <input
              className={`${classes.input} input_standard`}
              type="text"
              id="text"
              name="avatar"
              value={authMgr.formData.avatar}
              onChange={(e) => authMgr.onInputChange(e)}
              placeholder="optional"
            />
          </>
        )}
        {authMgr.showFeedback && (
          <p className={`p_feedback`}>{authMgr.feedMsg}</p>
        )}

        <input
          className={`${classes.btn} btn_standard`}
          type="submit"
          value={authMgr.showLogin ? "Login" : "Sign Up"}
        />
      </form>
    </Slide>
  );
};

export default AuthForms;
