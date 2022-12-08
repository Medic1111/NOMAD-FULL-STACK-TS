import { useContext, createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { userCtx } from "./user-ctx";

export const AuthCtx = createContext({
  showLogin: false,
  setShowLogin: () => {},
  userInfo: {
    email: "",
    username: "",
    password: "",
  },
  setUserInfo: () => {},
  onInputChange: () => {},
  resetUserInfo: () => {},
  submitForm: (action) => {},
  token: "",
  setToken: () => {},
  verifyToken: () => {},
  isAuth: false,
  setIsAuth: () => {},
  logoutHandler: () => {},
  isTokenExp: () => {},
  showFeedback: false,
  setShowFeedback: () => {},
  feedMsg: "",
  setFeedMsg: () => {},
  feeback: (statusCode) => {},
});

const AuthProvider = (props) => {
  const userMgr = useContext(userCtx);
  const nav = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedMsg, setFeedMsg] = useState("");
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
    avatar: "",
  });

  const onInputChange = (e) => {
    setShowFeedback(false);
    const { name, value } = e.target;
    setUserInfo((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const resetUserInfo = () => {
    setUserInfo({
      email: "",
      username: "",
      password: "",
      avatar: "",
    });
  };

  const logoutHandler = () => {
    setToken("");
    setIsAuth(false);
    userMgr.setCurrentUser({});
    localStorage.removeItem("userValidation");
  };

  const submitForm = async (action) => {
    let url;
    action === "login" ? (url = "/api/login") : (url = "/api/register");

    await axios
      .post(url, userInfo, { headers: { authorization: token } })
      .then((serverRes) => {
        userMgr.setCurrentUser({
          username: serverRes.data.username,
          avatar: serverRes.data.avatar,
        });
        nav("/posts");
        setIsAuth(true);
        const myExp = new Date(new Date().getTime() + 161 * 60 * 60);
        localStorage.setItem(
          "userValidation",
          JSON.stringify({
            username: serverRes.data.username,
            token: serverRes.data.token,
            expiration: myExp.toISOString(),
            avatar: serverRes.data.avatar,
          })
        );
        resetUserInfo();
      })
      .catch((err) => {
        feeback(err.response.status);
        setIsAuth(false);
      });
  };

  const verifyToken = async () => {
    let storedToken;
    const storedData = JSON.parse(localStorage.getItem("userValidation"));

    if (!storedData) {
      return;
    } else {
      storedToken = storedData.token;
    }

    await axios
      .get("/api/verification", { headers: { authorization: storedToken } })
      .then((serverRes) => {
        serverRes.status === 200 && setIsAuth(true);
      })
      .catch((err) => {
        setIsAuth(false);
        userMgr.setCurrentUser("");
      });
  };

  const isTokenExp = () => {
    const storedData = JSON.parse(localStorage.getItem("userValidation"));
    if (storedData && new Date(storedData.expiration) > new Date()) {
      setIsAuth(true);
      userMgr.setCurrentUser({
        username: storedData.username,
        avatar: storedData.avatar,
      });
    } else {
      nav("/");
      setIsAuth(false);
      userMgr.setCurrentUser({});
    }
  };

  const feeback = (statusCode) => {
    setShowFeedback(true);
    statusCode === 403 && setFeedMsg("Wrong password or username");
    statusCode === 404 && setFeedMsg("User not registered");
    statusCode === 422 &&
      setFeedMsg(
        "All fields required, password must contain at least 6 characters"
      );
    statusCode === 500 && setFeedMsg("Oops, something wrong with the server");
    statusCode === 409 && setFeedMsg("Email or Username already registered");
  };

  return (
    <AuthCtx.Provider
      value={{
        showLogin,
        setShowLogin,
        userInfo,
        setUserInfo,
        onInputChange,
        resetUserInfo,
        submitForm,
        token,
        setToken,
        isAuth,
        setIsAuth,
        verifyToken,
        logoutHandler,
        isTokenExp,
        showFeedback,
        setShowFeedback,
        feeback,
        setFeedMsg,
        feedMsg,
      }}
    >
      {props.children}
    </AuthCtx.Provider>
  );
};
export default AuthProvider;
