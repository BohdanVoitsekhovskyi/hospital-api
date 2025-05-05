import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import AppointmentService from '../services/AppointmentService';

const AppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancellingId, setCancellingId] = useState(null);

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
      setCancellingId(id);
      // Call the service to cancel the appointment
      const updatedAppointment = await AppointmentService.cancelAppointment(id);

      // Update the local state to reflect the cancellation
      setAppointments(appointments.map(appointment => 
        appointment.id === id 
          ? updatedAppointment
          : appointment
      ));
      setCancellingId(null);
    } catch (err) {
      setError('Failed to cancel appointment. Please try again.');
      console.error('Error cancelling appointment:', err);
      setCancellingId(null);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'FINISHED':
        return <Badge bg="success">Completed</Badge>;
      case 'PENDING':
        return <Badge bg="primary">Pending</Badge>;
      case 'ACCEPTED':
        return <Badge bg="info">Accepted</Badge>;
      case 'REJECTED':
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
            <th>Hospital</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>
                {appointment.timeslot?.doctor?.users?.name} {appointment.timeslot?.doctor?.users?.surname}
              </td>
              <td>
                {appointment.timeslot?.doctor?.specialization?.specializationName}
              </td>
              <td>
                {appointment.timeslot?.doctor?.hospital?.hospitalName}
              </td>
              <td>
                {appointment.timeslot?.date ? new Date(appointment.timeslot.date).toLocaleDateString() : 'N/A'}
              </td>
              <td>
                {appointment.timeslot?.time ? appointment.timeslot.time : 'N/A'}
              </td>
              <td>{getStatusBadge(appointment.status)}</td>
              <td>
                {appointment.status === 'PENDING' && (
                  <Button 
                    variant="outline-danger" 
                    size="sm"
                    onClick={() => handleCancelAppointment(appointment.id)}
                    disabled={cancellingId === appointment.id}
                  >
                    {cancellingId === appointment.id ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="visually-hidden">Cancelling...</span>
                      </>
                    ) : 'Cancel'}
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
