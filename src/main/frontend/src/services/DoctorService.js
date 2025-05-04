import axios from 'axios';

const API_URL = '/api/doctors';

// Mock data for doctor reviews
const mockReviews = {
  1: [
    { id: 1, patientName: "John Doe", rating: 5, comment: "Dr. Smith is an excellent cardiologist. Very knowledgeable and caring.", date: "2023-05-10" },
    { id: 2, patientName: "Jane Smith", rating: 4, comment: "Good doctor, but had to wait a bit for my appointment.", date: "2023-04-22" },
    { id: 3, patientName: "Robert Johnson", rating: 5, comment: "Highly recommend Dr. Smith. He explained everything clearly.", date: "2023-03-15" }
  ],
  2: [
    { id: 1, patientName: "Emily Davis", rating: 5, comment: "Dr. Johnson is amazing! She helped me with my migraines.", date: "2023-05-05" },
    { id: 2, patientName: "Michael Brown", rating: 3, comment: "Decent doctor, but the treatment didn't work as expected.", date: "2023-04-18" }
  ],
  3: [
    { id: 1, patientName: "Sarah Wilson", rating: 4, comment: "Dr. Brown is great with kids. My son loves him.", date: "2023-05-12" },
    { id: 2, patientName: "David Miller", rating: 5, comment: "Excellent pediatrician. Very patient and thorough.", date: "2023-04-30" },
    { id: 3, patientName: "Lisa Taylor", rating: 4, comment: "Good doctor, but the office wait time was long.", date: "2023-04-05" }
  ]
};

const DoctorService = {
  // Create a new doctor
  createDoctor: async (doctorData) => {
    try {
      const response = await axios.post(`${API_URL}/create`, doctorData);
      return response.data;
    } catch (error) {
      console.error('Error creating doctor:', error);
      throw error;
    }
  },

  // Get all doctors
  getAllDoctors: async () => {
    try {
      const response = await axios.get(`${API_URL}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching doctors:', error);
      throw error;
    }
  },

  // Get filtered doctors
  getFilteredDoctors: async (filters) => {
    try {
      const { specializationId, minRating, hospitalId, city } = filters;
      let url = `${API_URL}?`;

      if (specializationId) url += `specializationId=${specializationId}&`;
      if (minRating) url += `minRating=${minRating}&`;
      if (hospitalId) url += `hospitalId=${hospitalId}&`;
      if (city) url += `city=${encodeURIComponent(city)}&`;

      // Remove trailing '&' if exists
      url = url.endsWith('&') ? url.slice(0, -1) : url;

      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching filtered doctors:', error);
      throw error;
    }
  },

  // Get doctor by ID
  getDoctorById: async (doctorId) => {
    try {
      const response = await axios.get(`${API_URL}/${doctorId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching doctor with ID ${doctorId}:`, error);
      throw error;
    }
  },

  // Get reviews for a doctor
  getDoctorReviews: async (doctorId) => {
    try {
      // In a real application, this would make an API call
      // For now, we'll use mock data
      return mockReviews[doctorId] || [];
    } catch (error) {
      console.error(`Error fetching reviews for doctor with ID ${doctorId}:`, error);
      throw error;
    }
  },

  // Calculate average rating for a doctor
  calculateAverageRating: (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const sum = reviews.reduce((total, review) => total + review.rating, 0);
    return sum / reviews.length;
  },

  // Get all specializations
  getAllSpecializations: async () => {
    try {
      const response = await axios.get(`${API_URL}/specializations`);
      return response.data;
    } catch (error) {
      console.error('Error fetching specializations:', error);
      throw error;
    }
  },

  // Get all cities
  getAllCities: async () => {
    try {
      const response = await axios.get(`${API_URL}/cities`);
      return response.data;
    } catch (error) {
      console.error('Error fetching cities:', error);
      throw error;
    }
  },

  // Get all hospitals or hospitals filtered by city
  getHospitals: async (city = null) => {
    try {
      let url = `${API_URL}/hospitals`;
      if (city) {
        url += `?city=${encodeURIComponent(city)}`;
      }
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching hospitals:', error);
      throw error;
    }
  }
};

export default DoctorService;
