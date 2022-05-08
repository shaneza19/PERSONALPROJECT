import React, { createContext, useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios";

import { setToken, clearToken, getToken } from "../services/localStorage";

import { ErrorContext } from "../contexts/ErrorContext";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const { setError } = useContext(ErrorContext);

  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  //getMe 'backend function'
  useEffect(() => {
    if (getToken()) {
      axios
        .get("/user/me")
        .then((res) => setUser(res.data.user))
        .catch((err) => console.log(err));
    }
  }, []);

  const login = async (username, password) => {
    try {
      setError("");
      const res = await axios.post("/user/login", {
        username,
        password,
      });
      setToken(res.data.token);
      setUser(res.data.user);
      navigate("/profile");
    } catch (err) {
      setError(err.response.data.message);
      console.log(err);
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
    localStorage.removeItem("sidebar-collapsed");
  };

  //to update picture when upload profile pic
  const updateUser = (value) => {
    setUser((prev) => ({ ...prev, ...value }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

export { AuthContext };
