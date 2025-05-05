import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import AppointmentService from '../services/AppointmentService';

const AppointmentForm = ({ preselectedDoctorId }) => {
  const [doctors, setDoctors] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTimeSlots, setLoadingTimeSlots] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    doctorId: preselectedDoctorId || '',
    timeSlotId: '',
    reason: ''
  });

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const doctorsData = await AppointmentService.getDoctors();
        setDoctors(doctorsData);

        // If a doctor is preselected, fetch their available time slots
        if (preselectedDoctorId) {
          fetchTimeSlots(preselectedDoctorId);
        }
      } catch (err) {
        setError('Failed to load doctors. Please try again later.');
        console.error('Error fetching doctors:', err);
      }
    };

    fetchDoctors();
  }, [preselectedDoctorId]);

  const fetchTimeSlots = async (doctorId) => {
    if (!doctorId) return;

    setLoadingTimeSlots(true);
    setTimeSlots([]);
    setFormData(prev => ({ ...prev, timeSlotId: '' }));
    // Clear any previous error messages when starting to fetch
    setError('');

    try {
      console.log(`[DEBUG] Fetching time slots for doctor ID: ${doctorId}`);
      const timeSlotsData = await AppointmentService.getAvailableTimeSlots(doctorId);
      console.log(`[DEBUG] Received ${timeSlotsData.length} time slots:`, timeSlotsData);

      setTimeSlots(timeSlotsData);

      // Check if there are no time slots
      if (timeSlotsData.length === 0) {
        console.log('[DEBUG] No time slots available, setting error message');
        setError('No available time slots for this doctor. Please select another doctor or try again later.');
      }
    } catch (err) {
      console.error('[DEBUG] Error fetching time slots:', err);
      setError('Failed to load available time slots. Please try again later.');
    } finally {
      setLoadingTimeSlots(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // If the doctor selection changes, fetch their available time slots
    if (name === 'doctorId' && value) {
      fetchTimeSlots(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      // Create appointment data object with time slot ID
      const appointmentData = {
        timeSlotId: formData.timeSlotId
      };

      // Create the appointment using the service
      await AppointmentService.createAppointment(appointmentData);

      setSuccess('Appointment scheduled successfully!');
      setFormData({
        doctorId: preselectedDoctorId || '',
        timeSlotId: '',
        reason: ''
      });

      // Refresh time slots after booking
      if (formData.doctorId) {
        fetchTimeSlots(formData.doctorId);
      }
    } catch (err) {
      setError('Failed to schedule appointment. Please try again.');
      console.error('Appointment error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Group time slots by date for better organization
  const groupedTimeSlots = timeSlots.reduce((acc, slot) => {
    if (!acc[slot.date]) {
      acc[slot.date] = [];
    }
    acc[slot.date].push(slot);
    return acc;
  }, {});

  return (
    <div>
      <h3>Schedule a New Appointment</h3>

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Select Doctor</Form.Label>
          {preselectedDoctorId ? (
            // Show text field when doctor is preselected
            (() => {
              const selectedDoctor = doctors.find(doctor => doctor.id.toString() === preselectedDoctorId.toString());
              return (
                <Form.Control
                  type="text"
                  value={selectedDoctor 
                    ? `${selectedDoctor.users.name} ${selectedDoctor.users.surname} - ${selectedDoctor.specialization.specializationName}`
                    : 'Loading doctor information...'}
                  readOnly
                />
              );
            })()
          ) : (
            // Show dropdown when no doctor is preselected
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
          )}
        </Form.Group>

        {loadingTimeSlots ? (
          <div className="text-center my-4">
            <p>Loading available time slots...</p>
          </div>
        ) : timeSlots.length > 0 ? (
          <div className="mb-4">
            <Form.Label>Select an Available Time Slot</Form.Label>
            <div className="time-slots-container">
              {Object.keys(groupedTimeSlots).sort().map(date => (
                <Card key={date} className="mb-3">
                  <Card.Header>
                    <strong>{new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                  </Card.Header>
                  <Card.Body>
                    <Row>
                      {groupedTimeSlots[date].map(slot => (
                        <Col key={slot.id} xs={12} sm={6} md={4} lg={3} className="mb-2">
                          <Form.Check
                            type="radio"
                            id={`slot-${slot.id}`}
                            name="timeSlotId"
                            value={slot.id}
                            checked={formData.timeSlotId === slot.id.toString()}
                            onChange={handleChange}
                            label={new Date(`${date}T${slot.time}`).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                            className="time-slot-option"
                          />
                        </Col>
                      ))}
                    </Row>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        ) : formData.doctorId ? (
          <Alert variant="warning" className="mb-3">
            No available time slots for this doctor. Please select another doctor or try again later.
          </Alert>
        ) : null}

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

        <Button 
          variant="primary" 
          type="submit" 
          disabled={loading || !formData.timeSlotId || timeSlots.length === 0}
        >
          {loading ? 'Scheduling...' : 'Schedule Appointment'}
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}

      <style jsx>{`
        .time-slots-container {
          max-height: 400px;
          overflow-y: auto;
        }
        .time-slot-option {
          padding: 8px;
          border-radius: 4px;
          transition: background-color 0.2s;
        }
        .time-slot-option:hover {
          background-color: #f8f9fa;
        }
      `}</style>
    </div>
  );
};

export default AppointmentForm;
