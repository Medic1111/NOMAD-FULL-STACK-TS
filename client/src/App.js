import { Routes, Route, Navigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthCtx } from "./features/auth-ctx";
import Home from "./pages/Home/Home";
import Auth from "./pages/Auth/Auth";
import Posts from "./pages/Posts/Posts";
import User from "./pages/User/User";
import SpecPost from "./pages/SpecPost/SpecPost";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";

function App() {
  const authMgr = useContext(AuthCtx);

  useEffect(() => {
    authMgr.isTokenExp();
  }, []);

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/posts/:id" element={<SpecPost />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
