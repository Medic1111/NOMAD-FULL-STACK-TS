import { Navigate } from "react-router-dom";
import React, { useContext } from "react";
import { authCtx } from "../../features/auth-ctx";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  const authMgr = useContext(authCtx);

  return (
    <>
      {authMgr.isAuth === false && <Navigate to="/auth" replace />}
      {authMgr.isAuth === true && children}
    </>
  );
};

export default ProtectedRoute;
