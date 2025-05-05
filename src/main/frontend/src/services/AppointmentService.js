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

      // Make the API call to get appointments for the current user using PatientController
      const response = await axios.get(`/api/patients/${user.id}/appointments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error);
      throw error;
    }
  },

  // Get all appointments for a doctor
  getDoctorAppointments: async (doctorId) => {
    try {
      if (!doctorId) {
        throw new Error('Doctor ID is required');
      }

      // Make the API call to get appointments for the doctor
      const response = await axios.get(`${API_URL}/doctor/${doctorId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctor appointments:', error);
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
        patientId: user.id,
        doctorTimeSlotId: appointmentData.timeSlotId
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

  // Update appointment status (for doctors)
  updateAppointmentStatus: async (appointmentId, status) => {
    try {
      if (!appointmentId) {
        throw new Error('Appointment ID is required');
      }

      if (!status) {
        throw new Error('Status is required');
      }

      // Make the API call to update the appointment status
      const response = await axios.put(`${API_URL}/${appointmentId}/status`, { status });
      return response.data;
    } catch (error) {
      console.error('Error updating appointment status:', error);
      throw error;
    }
  },

  // Get available doctors
  getDoctors: async () => {
    try {
      // Make the API call to get available doctors
      const response = await axios.get('/api/doctors');
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },

  // Get available time slots for a doctor
  getAvailableTimeSlots: async (doctorId) => {
    try {
      if (!doctorId) {
        throw new Error('Doctor ID is required');
      }

      // Make the API call to get available time slots for the doctor
      const response = await axios.get(`/api/doctors/${doctorId}/time-slots?available=true`);
      return response.data;
    } catch (error) {
      console.error('Error fetching available time slots:', error);
      throw error;
    }
  }
};

export default AppointmentService;
