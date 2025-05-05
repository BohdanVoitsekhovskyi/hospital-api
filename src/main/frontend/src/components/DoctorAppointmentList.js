import React, { useState, useEffect } from 'react';
import { Table, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import AppointmentService from '../services/AppointmentService';

const DoctorAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (!user) {
          throw new Error('User not authenticated');
        }

        // Get the doctor's ID from the user object
        const doctorId = user.id;
        
        // Fetch appointments for the doctor
        const appointmentsData = await AppointmentService.getDoctorAppointments(doctorId);
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

  const handleUpdateAppointmentStatus = async (id, status) => {
    try {
      setProcessingId(id);
      // Call the service to update the appointment status
      // This is a placeholder - we need to implement this method in AppointmentService
      const updatedAppointment = await AppointmentService.updateAppointmentStatus(id, status);

      // Update the local state to reflect the status change
      setAppointments(appointments.map(appointment => 
        appointment.id === id 
          ? updatedAppointment
          : appointment
      ));
      setProcessingId(null);
    } catch (err) {
      setError(`Failed to ${status.toLowerCase()} appointment. Please try again.`);
      console.error(`Error ${status.toLowerCase()}ing appointment:`, err);
      setProcessingId(null);
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
            <th>Patient</th>
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
                {appointment.patient?.users?.name} {appointment.patient?.users?.surname}
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
                  <>
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      className="me-2"
                      onClick={() => handleUpdateAppointmentStatus(appointment.id, 'ACCEPTED')}
                      disabled={processingId === appointment.id}
                    >
                      {processingId === appointment.id ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          <span className="visually-hidden">Processing...</span>
                        </>
                      ) : 'Accept'}
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleUpdateAppointmentStatus(appointment.id, 'REJECTED')}
                      disabled={processingId === appointment.id}
                    >
                      {processingId === appointment.id ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          <span className="visually-hidden">Processing...</span>
                        </>
                      ) : 'Reject'}
                    </Button>
                  </>
                )}
                {appointment.status === 'ACCEPTED' && (
                  <Button 
                    variant="outline-success" 
                    size="sm"
                    onClick={() => handleUpdateAppointmentStatus(appointment.id, 'FINISHED')}
                    disabled={processingId === appointment.id}
                  >
                    {processingId === appointment.id ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        <span className="visually-hidden">Processing...</span>
                      </>
                    ) : 'Mark as Completed'}
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

export default DoctorAppointmentList;