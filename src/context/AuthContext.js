import { createContext, useEffect, useState } from "react";
import {
  getAuth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { provider } from "../config/firebase";
import { toast } from "react-toastify";

const initialValue = {
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  loading: false,
  user: {},
};
export const AuthContext = createContext(initialValue);

const AuthContextProvider = ({ children }) => {
  // const [isLoggedIn, setIsLoggedIn] = useState(
  //   localStorage.getItem("isLoggedIn") ? true : false
  // );

  // const login = () => {
  //   localStorage.setItem("isLoggedIn", true);
  //   setIsLoggedIn(true);
  // };
  // const logout = () => {
  //   localStorage.removeItem("isLoggedIn");
  //   setIsLoggedIn(false);
  // };

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      console.log(user);
      if (user) {
        setIsLoggedIn(true);
        setUser(user);
      } else {
        setIsLoggedIn(false);
        setUser({});
      }
    });
  }, []);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});

  const login = () => {
    setLoading(true);
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        console.log(result.user);
        setIsLoggedIn(true);
        setUser(result.user);
      })
      .catch((error) => {
        setIsLoggedIn(false);
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const logout = () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      setIsLoggedIn(false);
    });
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout, loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
