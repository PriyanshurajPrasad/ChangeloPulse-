import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize Auth state by calling backend /api/auth/me
  const checkAuthStatus = async () => {
    try {
      setLoading(true);
      const res = await authService.getMe();
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const userLogin = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.userLogin(credentials);
      if (res.success && res.data) {
        setUser(res.data);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const userRegister = async (userData) => {
    setLoading(true);
    try {
      const res = await authService.userRegister(userData);
      if (res.success && res.data) {
        setUser(res.data);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const adminLogin = async (credentials) => {
    setLoading(true);
    try {
      const res = await authService.adminLogin(credentials);
      if (res.success && res.data) {
        setUser(res.data);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const adminRegister = async (adminData) => {
    setLoading(true);
    try {
      const res = await authService.adminRegister(adminData);
      if (res.success && res.data) {
        setUser(res.data);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const login = userLogin;
  const register = userRegister;

  const adminAccess = async (code) => {
    setLoading(true);
    try {
      const res = await authService.adminAccess(code);
      if (res.success && res.data) {
        setUser(res.data);
      }
      return res;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
    } finally {
      setUser(null);
      setLoading(false);
    }
  };

  const value = {
    user,
    role: user?.role || null,
    isAdmin: user?.role === 'admin',
    isUser: user?.role === 'user',
    isAuthenticated: !!user,
    loading,
    login,
    register,
    userLogin,
    userRegister,
    adminLogin,
    adminRegister,
    adminAccess,
    logout,
    refreshUser: checkAuthStatus
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
