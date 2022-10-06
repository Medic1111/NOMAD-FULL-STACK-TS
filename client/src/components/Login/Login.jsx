import { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import classes from "./Login.module.css";

const Login = () => {
  const authMgr = useContext(AuthCtx);

  const submitHandler = (e) => {
    e.preventDefault();
    authMgr.submitForm("login");
  };

  return (
    <div className={classes.formBox}>
      <form className={classes.form}>
        <h3 className={classes.h3}>LOGIN</h3>
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
        <button
          onClick={submitHandler}
          className={classes.btn}
          type="submit"
          value="Login"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
