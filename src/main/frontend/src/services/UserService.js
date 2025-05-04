import axios from 'axios';
import AuthService from './AuthService';

const API_URL = '/api/user';

const UserService = {
  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  },

  // Update user information
  updateUser: async (id, userData) => {
    try {
      const response = await axios.post(`${API_URL}/${id}/edit`, userData);
      
      // Update the user in localStorage if it's the current user
      const currentUser = AuthService.getCurrentUser();
      if (currentUser && currentUser.id === id) {
        // Create a new user object with updated fields
        const updatedUser = { ...currentUser, ...response.data };
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }
      
      return response.data;
    } catch (error) {
      console.error('Error updating user:', error);
      throw error;
    }
  }
};

export default UserService;