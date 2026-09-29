import { createContext, useContext, useEffect, useState } from 'react';
import { api, getToken, setToken } from '../data/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [needsProfile, setNeedsProfile] = useState(false);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [loading, setLoading] = useState(true);

  async function refreshUser() {
    if (!getToken()) {
      setUser(null);
      setNeedsProfile(false);
      setDefaultAddress(null);
      return null;
    }
    try {
      const data = await api.me();
      setUser(data.user);
      setNeedsProfile(Boolean(data.needsProfile));
      setDefaultAddress(data.defaultAddress || null);
      return data.user;
    } catch {
      setToken(null);
      setUser(null);
      setNeedsProfile(false);
      setDefaultAddress(null);
      return null;
    }
  }

  useEffect(() => {
    if (!getToken()) {
      setLoading(false);
      return;
    }
    refreshUser().finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const { token, user } = await api.login({ email, password });
    setToken(token);
    setUser(user);
    await refreshUser();
    return user;
  }

  async function signup(payload) {
    const { token, user } = await api.signup(payload);
    setToken(token);
    setUser(user);
    await refreshUser();
    return user;
  }

  async function googleLogin(credential) {
    const res = await api.googleLogin({ credential });
    setToken(res.token);
    setUser(res.user);
    setNeedsProfile(Boolean(res.needsProfile));
    setDefaultAddress(res.defaultAddress || null);
    return res;
  }

  async function completeProfile(payload) {
    const res = await api.completeProfile(payload);
    setUser(res.user);
    setNeedsProfile(false);
    setDefaultAddress(res.defaultAddress || null);
    return res;
  }

  async function forgotPassword(email) {
    return api.forgotPassword({ email });
  }

  async function resetPassword(token, newPassword) {
    const { token: authToken, user } = await api.resetPassword({ token, newPassword });
    setToken(authToken);
    setUser(user);
    await refreshUser();
    return user;
  }

  function logout() {
    setToken(null);
    setUser(null);
    setNeedsProfile(false);
    setDefaultAddress(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        needsProfile,
        defaultAddress,
        login,
        signup,
        googleLogin,
        completeProfile,
        refreshUser,
        logout,
        forgotPassword,
        resetPassword,
        isAdmin: !!user?.isAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
