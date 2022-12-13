import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthCtxType } from "../models/auth-models";
import { FormDataTemplate } from "../models/auth-models";
import { CurrentUserTemplate } from "../models/user-models";
import { userCtx } from "./user-ctx";
import { UiCtx } from "./ui-ctx";

export const authCtx = createContext<AuthCtxType>({
  showLogin: false,
  setShowLogin: () => {},
  formData: FormDataTemplate,
  setFormData: () => {},
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => {},
  resetFormData: () => {},
  verifyToken: () => {},
  isAuth: false,
  setIsAuth: () => {},
  logoutHandler: () => {},
  isTokenExp: () => {},
  showFeedback: false,
  setShowFeedback: () => {},
  feedMsg: "",
  setFeedMsg: () => {},
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => {},
  onShowForm: (login: boolean) => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const nav = useNavigate();
  const userMgr = useContext(userCtx);
  const uiMgr = useContext(UiCtx);
  const [showLogin, setShowLogin] = useState(false);
  const [formData, setFormData] = useState(FormDataTemplate);
  const [isAuth, setIsAuth] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedMsg, setFeedMsg] = useState("");

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowFeedback(false);
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const resetFormData = () => setFormData(FormDataTemplate);

  const verifyToken = async () => {
    let storedToken;
    const storedData = JSON.parse(
      localStorage.getItem("userValidation") || "{}"
    );
    storedData && (storedToken = storedData.token);

    await axios
      .get("/api/verification", { headers: { authorization: storedToken } })
      .then((serverRes) => setIsAuth(true))
      .catch((err) => logoutHandler());
  };

  const logoutHandler = () => {
    setIsAuth(false);
    userMgr.setCurrentUser(CurrentUserTemplate);
    localStorage.removeItem("userValidation");
    nav("/");
  };

  const isTokenExp = () => {
    const storedData = JSON.parse(
      localStorage.getItem("userValidation") || "{}"
    );
    if (storedData && new Date(storedData.expiration) > new Date()) {
      setIsAuth(true);

      userMgr.setCurrentUser({
        username: storedData.username,
        avatar: storedData.avatar,
      });
    } else {
      logoutHandler();
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    uiMgr.dispatch({ type: "LOADING" });

    e.preventDefault();
    let url;
    showLogin ? (url = "/api/login") : (url = "/api/register");

    await axios
      .post(url, formData)
      .then((serverRes) => {
        userMgr.setCurrentUser({
          username: serverRes.data.username,
          avatar: serverRes.data.avatar,
        });
        uiMgr.dispatch({ type: "CLOSE" });

        setIsAuth(true);
        const myExp = new Date(new Date().getTime() + 1000 * 60 * 60);
        localStorage.setItem(
          "userValidation",
          JSON.stringify({
            username: serverRes.data.username,
            token: serverRes.data.token,
            expiration: myExp.toISOString(),
            avatar: serverRes.data.avatar,
          })
        );
        resetFormData();
      })
      .catch((err) => {
        uiMgr.dispatch({ type: "CLOSE" });
        setShowFeedback(true);
        setFeedMsg(err.response.data.message);
      });
  };

  const onShowForm = (login: boolean) => {
    login ? setShowLogin(true) : setShowLogin(false);
    nav("/auth");
  };

  return (
    <authCtx.Provider
      value={{
        showLogin,
        setShowLogin,
        formData,
        setFormData,
        onInputChange,
        resetFormData,
        verifyToken,
        isAuth,
        setIsAuth,
        logoutHandler,
        isTokenExp,
        showFeedback,
        setShowFeedback,
        feedMsg,
        setFeedMsg,
        onSubmit,
        onShowForm,
      }}
    >
      {children}
    </authCtx.Provider>
  );
};

export default AuthProvider;
