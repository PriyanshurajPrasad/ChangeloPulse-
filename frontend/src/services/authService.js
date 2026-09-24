import API from './api';

export const authService = {
  userLogin: async (credentials) => {
    const response = await API.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  userRegister: async (userData) => {
    const response = await API.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  adminLogin: async (credentials) => {
    const response = await API.post('/auth/admin/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  adminRegister: async (adminData) => {
    const response = await API.post('/auth/admin/register', adminData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  login: async (credentials) => {
    return authService.userLogin(credentials);
  },

  register: async (userData) => {
    return authService.userRegister(userData);
  },

  adminAccess: async (code) => {
    const response = await API.post('/auth/admin-access', { code });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  logout: async () => {
    try {
      await API.post('/auth/logout');
    } catch (e) {
      // Ignore network failures on logout
    } finally {
      localStorage.removeItem('token');
    }
  },

  getMe: async () => {
    const response = await API.get('/auth/me');
    return response.data;
  }
};
