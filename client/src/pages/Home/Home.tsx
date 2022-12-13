import Hero from "../../components/Hero/Hero";
import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { authCtx } from "../../features/auth-ctx";

const Home: React.FC = () => {
  const authMgr = useContext(authCtx);

  if (authMgr.isAuth) {
    // ATTEMPT RETURNING CHILNdren
    return <Navigate to={"/posts"} replace />;
  }

  return <Hero />;
};

export default Home;
