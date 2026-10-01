const AUTH_USER_KEY = 'role_login_user';

function login(username, role) {
  const cleanUsername = username.trim();

  if (!cleanUsername) {
    throw new Error('Please enter a username.');
  }

  const user = {
    username: cleanUsername,
    role,
  };

  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  return user;
}

function logout() {
  localStorage.removeItem(AUTH_USER_KEY);
}

function restoreSession() {
  try {
    const storedUser = localStorage.getItem(AUTH_USER_KEY);
    return storedUser ? JSON.parse(storedUser) : null;
  } catch {
    logout();
    return null;
  }
}

export const authService = {
  login,
  logout,
  restoreSession,
};
