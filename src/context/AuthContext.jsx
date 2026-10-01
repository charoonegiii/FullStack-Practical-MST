import { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    setCurrentUser(authService.restoreSession());
  }, []);

  function login(username, role) {
    const user = authService.login(username, role);
    setCurrentUser(user);
    return user;
  }

  function logout() {
    authService.logout();
    setCurrentUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: Boolean(currentUser),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
