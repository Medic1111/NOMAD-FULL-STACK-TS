import { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthForms from "../../components/AuthForms/AuthForms";
import { authCtx } from "../../features/auth-ctx";

const Auth: React.FC = () => {
  const authMgr = useContext(authCtx);
  if (authMgr.isAuth) return <Navigate to={"/posts"} replace />;

  return <AuthForms />;
};

export default Auth;
