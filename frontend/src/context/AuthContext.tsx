import React, { createContext, useState } from 'react';

type AuthContextType = {
  isLoggedIn: boolean;
  userName: string;
  login: (name: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  userName: '',
  login: () => {},
  logout: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userName, setUserName] = useState<string>('');

  const login = (name: string) => {
    setIsLoggedIn(true);
    setUserName(name);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('token'); // Clear token on logout
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userName, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};