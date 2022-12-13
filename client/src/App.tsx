import { useContext, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { authCtx } from "./features/auth-ctx";
import Home from "./pages/Home/Home";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";
import Posts from "./pages/Posts/Posts";
import SpecPost from "./pages/SpecPost/SpecPost";
import User from "./pages/User/User";
import Auth from "./pages/Auth/Auth";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

function App() {
  const authMgr = useContext(authCtx);

  useEffect(() => {
    authMgr.isTokenExp();
  }, []);

  return (
    <div className="App">
      <Nav />
      <Routes>
        {/* HOME PAGE */}

        <Route path="/" element={<Home />} />

        {/* AUTH PAGE */}

        <Route path="/auth" element={<Auth />} />

        {/* USER PROFILE PAGE */}

        <Route
          path="/users/:id"
          element={
            <ProtectedRoute>
              <User />
            </ProtectedRoute>
          }
        />

        {/* SPEC POST ROUTE */}

        <Route
          path="/posts/:id"
          element={
            <ProtectedRoute>
              <SpecPost />
            </ProtectedRoute>
          }
        />

        {/* POSTS ROUTE */}

        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          }
        />

        {/* ANY OTHER ROUTES NO 404 */}

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
