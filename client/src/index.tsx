import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./features/auth-ctx";
import UserProvider from "./features/user-ctx";
import PostsProvider from "./features/posts-ctx";
import UiProvider from "./features/ui-ctx";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <UiProvider>
        <UserProvider>
          <PostsProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </PostsProvider>
        </UserProvider>
      </UiProvider>
    </BrowserRouter>
  </React.StrictMode>
);
