import axios from 'axios';
import AuthService from './AuthService';

const API_URL = '/api/appointments';

const AppointmentService = {
  // Get all appointments for the current user
  getAppointments: async () => {
    try {
      const user = AuthService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Make the API call to get appointments for the current user
      const response = await axios.get(`${API_URL}/user/${user.id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  // Create a new appointment
  createAppointment: async (appointmentData) => {
    try {
      const user = AuthService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Make the API call to create a new appointment
      const response = await axios.post(API_URL, {
        ...appointmentData,
        patientId: user.id
      });

      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error);
      throw error;
    }
  },

  // Cancel an appointment
  cancelAppointment: async (appointmentId) => {
    try {
      const user = AuthService.getCurrentUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      // Make the API call to cancel the appointment
      const response = await axios.put(`${API_URL}/${appointmentId}/cancel`);
      return response.data;
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      throw error;
    }
  },

  // Get available doctors
  getDoctors: async () => {
    try {
      // Make the API call to get available doctors
      const response = await axios.get(`${API_URL}/doctors`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  }
};

export default AppointmentService;
