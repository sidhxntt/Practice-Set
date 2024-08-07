import React, { createContext, useState, useContext, useEffect } from 'react';
import Cookies from 'js-cookie';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = Cookies.get('jwt');
  const google_token = Cookies.get('google_jwt');

  useEffect(() => {
    if (token || google_token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, [token, google_token]);

  const login = () => {
    if (token || google_token) {
      setIsAuthenticated(true);
    } else {
      console.log("No token found");
    }
  };

  const logout = () => {
    Cookies.remove('jwt');
    Cookies.remove('google_jwt');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
