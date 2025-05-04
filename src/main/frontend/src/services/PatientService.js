import axios from 'axios';
import AuthService from './AuthService';

const API_URL = '/api/patients';

const PatientService = {
  // Get medical card by ID
  getMedcard: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/medcard/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching medical card:', error);
      throw error;
    }
  },

  // Create a new medical card
  createMedcard: async (medcardData) => {
    try {
      const user = AuthService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const response = await axios.post(`${API_URL}/medcard`, medcardData);
      return response.data;
    } catch (error) {
      console.error('Error creating medical card:', error);
      throw error;
    }
  },

  // Update an existing medical card
  updateMedcard: async (id, medcardData) => {
    try {
      const user = AuthService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const response = await axios.put(`${API_URL}/medcard/${id}`, medcardData);
      return response.data;
    } catch (error) {
      console.error('Error updating medical card:', error);
      throw error;
    }
  }
};

export default PatientService;