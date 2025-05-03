import axios from 'axios';

const API_URL = '/api/auth';

const AuthService = {
  login: async (loginData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, loginData);
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  register: async (registerData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, registerData);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  },

  isAuthenticated: () => {
    return localStorage.getItem('user') !== null;
  }
};

export default AuthService;