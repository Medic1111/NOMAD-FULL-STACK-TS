import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./features/auth-ctx";
import UserProvider from "./features/user-ctx";
import PostsProvider from "./features/posts-ctx";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UserProvider>
        <PostsProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </PostsProvider>
      </UserProvider>
    </BrowserRouter>
  </React.StrictMode>
);
