import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('auth');
    localStorage.removeItem('user');
  };

  useEffect(() => {
    // Check localStorage on mount
    const auth = localStorage.getItem('auth');
    const userData = localStorage.getItem('user');
    if (auth === 'true' && userData) {
      setIsAuthenticated(true);
      try {
        setUser(JSON.parse(userData));
      } catch (e) {
        console.error('Error parsing user data:', e);
        logout(); // Clear invalid data
      }
    }
  }, []);

  // FIX: login receives token (string), not { session }
  const login = (token) => {
    setIsAuthenticated(true);
    setUser(token);
    localStorage.setItem('auth', 'true');
    localStorage.setItem('user', JSON.stringify(token));
  };

  const value = {
    isAuthenticated,
    user,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};