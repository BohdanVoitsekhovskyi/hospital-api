import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Alert } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import AppointmentService from '../services/AppointmentService';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const appointmentsData = await AppointmentService.getAppointments();
        setAppointments(appointmentsData);
        setLoading(false);
      } catch (err) {
        setError('Failed to load appointments. Please try again later.');
        console.error('Error fetching appointments:', err);
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const handleCancelAppointment = async (id) => {
    try {
      // Call the service to cancel the appointment
      await AppointmentService.cancelAppointment(id);

      // Update the local state to reflect the cancellation
      setAppointments(appointments.map(appointment => 
        appointment.id === id 
          ? { ...appointment, status: 'CANCELLED' } 
          : appointment
      ));
    } catch (err) {
      setError('Failed to cancel appointment. Please try again.');
      console.error('Error cancelling appointment:', err);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge bg="success">Completed</Badge>;
      case 'UPCOMING':
        return <Badge bg="primary">Upcoming</Badge>;
      case 'CANCELLED':
        return <Badge bg="danger">Cancelled</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (appointments.length === 0) {
    return <Alert variant="info">You don't have any appointments yet.</Alert>;
  }

  return (
    <div>
      <h3>Your Appointments</h3>

      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Doctor</th>
            <th>Specialization</th>
            <th>Date</th>
            <th>Time</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.doctorName}</td>
              <td>{appointment.specialization}</td>
              <td>{appointment.date}</td>
              <td>{appointment.time}</td>
              <td>{appointment.reason}</td>
              <td>{getStatusBadge(appointment.status)}</td>
              <td>
                {appointment.status === 'UPCOMING' && (
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleCancelAppointment(appointment.id)}
                  >
                    Cancel
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AppointmentList;
