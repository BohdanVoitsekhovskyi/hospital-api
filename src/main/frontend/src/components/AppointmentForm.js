import React, { useState, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import AppointmentService from '../services/AppointmentService';

const AppointmentForm = ({ preselectedDoctorId }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    doctorId: preselectedDoctorId || '',
    date: '',
    time: '',
    reason: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsData = await AppointmentService.getDoctors();
        setDoctors(doctorsData);
      } catch (err) {
        setError('Failed to load doctors. Please try again later.');
        console.error('Error fetching doctors:', err);
      }
    };

    fetchDoctors();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Get the selected doctor's name and specialization for display purposes
      const selectedDoctor = doctors.find(doctor => doctor.id.toString() === formData.doctorId.toString());

      // Create appointment data object with doctor details
      const appointmentData = {
        ...formData,
        doctorName: selectedDoctor ? `${selectedDoctor.users.name} ${selectedDoctor.users.surname}` : '',
        specialization: selectedDoctor ? selectedDoctor.specialization.specializationName : ''
      };

      // Create the appointment using the service
      await AppointmentService.createAppointment(appointmentData);

      setSuccess('Appointment scheduled successfully!');
      setFormData({
        doctorId: '',
        date: '',
        time: '',
        reason: ''
      });
    } catch (err) {
      setError('Failed to schedule appointment. Please try again.');
      console.error('Appointment error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Schedule a New Appointment</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Select Doctor</Form.Label>
          <Form.Select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a doctor --</option>
            {doctors.map(doctor => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.users.name} {doctor.users.surname} - {doctor.specialization.specializationName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Date</Form.Label>
          <Form.Control
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Time</Form.Label>
          <Form.Control
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Reason for Visit</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="reason"
            value={formData.reason}
            onChange={handleChange}
            required
            placeholder="Please describe your symptoms or reason for the appointment"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading ? 'Scheduling...' : 'Schedule Appointment'}
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}
    </div>
  );
};

export default AppointmentForm;
