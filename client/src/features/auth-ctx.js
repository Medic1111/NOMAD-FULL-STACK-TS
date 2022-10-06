import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
});

const AuthProvider = (props) => {
  const nav = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState("");
  const [isAuth, setIsAuth] = useState(false);
  const [userInfo, setUserInfo] = useState({
    email: "",
    username: "",
    password: "",
  });

  const onInputChange = (e) => {
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
    });
  };

  const logoutHandler = () => {
    setToken("");
    setIsAuth(false);
    localStorage.removeItem("userValidation");
  };

  const submitForm = async (action) => {
    let url;
    action === "login" ? (url = "/login") : (url = "/register");

    await axios
      .post(url, userInfo, { headers: { authorization: token } })
      .then((serverRes) => {
        nav("/posts");
        setIsAuth(true);
        const myExp = new Date(new Date().getTime() + 161 * 60 * 60);
        localStorage.setItem(
          "userValidation",
          JSON.stringify({
            username: serverRes.data.username,
            token: serverRes.data.token,
            expiration: myExp.toISOString(),
          })
        );
        resetUserInfo();
      })
      .catch((err) => {
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
      .catch((err) => setIsAuth(false));
  };

  const isTokenExp = () => {
    const storedData = JSON.parse(localStorage.getItem("userValidation"));
    if (storedData && new Date(storedData.expiration) > new Date()) {
      setIsAuth(true);
      // SET CURRENT USERNAME IF ANY
    } else {
      nav("/auth");
      setIsAuth(false);
    }
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
      }}
    >
      {props.children}
    </AuthCtx.Provider>
  );
};
export default AuthProvider;
