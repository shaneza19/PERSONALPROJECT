import { createContext, useEffect, useState } from 'react';
import axios from '../config/axios';
import { setToken, clearToken, getToken } from '../services/localStorage';
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  
  const navigate = useNavigate()

  //getMe (userController backend)
  useEffect(() => {
    if (getToken()) {
      axios
        .get('/user/me')
        .then(res => setUser(res.data.user))
        .catch(err => console.log(err));
    }
  }, []);

  const login = async (username, password) => {
    try {
      const res = await axios.post('/user/login', {
        username,
        password
      });
      setToken(res.data.token);
      setUser(res.data.user);
      navigate('/profile');
    } catch (err) {
      console.log(err);
    }
  };

  const logout = () => {
    clearToken();
    setUser(null);
    localStorage.removeItem("sidebar-collapsed");
  };

  //...(prev clone orginal value), then replace with ...value (new value)
  //updateUser for Header.js in layouts folder (to update picture when upload profile pic)
  const updateUser = value => {
    setUser(prev => ({ ...prev, ...value }));
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;

export { AuthContext };
