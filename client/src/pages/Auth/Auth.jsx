import { useContext } from "react";
import { AuthCtx } from "../../features/auth-ctx";
import Login from "../../components/Login/Login";
import Signup from "../../components/Signup/Signup";

const Auth = () => {
  const authMgr = useContext(AuthCtx);

  return <>{authMgr.showLogin ? <Login /> : <Signup />}</>;
};

export default Auth;
