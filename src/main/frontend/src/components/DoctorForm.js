import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import DoctorService from '../services/DoctorService';

const DoctorForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [specializations, setSpecializations] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [fetchingData, setFetchingData] = useState(false);
  const [formData, setFormData] = useState({
    userDTO: {
      email: '',
      password: '',
      name: '',
      surname: '',
      phoneNumber: '',
      role: 'DOCTOR'
    },
    specializationId: '',
    hospitalId: '',
    doctorTimeSlotDTOS: []
  });

  const [timeSlot, setTimeSlot] = useState({
    date: '',
    time: ''
  });

  // Fetch specializations and hospitals from the backend
  useEffect(() => {
    const fetchData = async () => {
      setFetchingData(true);
      try {
        // Fetch specializations
        const specializationsData = await DoctorService.getAllSpecializations();
        setSpecializations(specializationsData);

        // Fetch hospitals
        const hospitalsData = await DoctorService.getHospitals();
        setHospitals(hospitalsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load specializations or hospitals. Please refresh the page.');
      } finally {
        setFetchingData(false);
      }
    };

    fetchData();
  }, []);

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      userDTO: {
        ...formData.userDTO,
        [name]: value
      }
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleTimeSlotChange = (e) => {
    const { name, value } = e.target;
    setTimeSlot({
      ...timeSlot,
      [name]: value
    });
  };

  const addTimeSlot = () => {
    if (!timeSlot.date || !timeSlot.time) {
      setError('Please select both date and time for the appointment slot');
      return;
    }

    // Add the new time slot to the list
    setFormData({
      ...formData,
      doctorTimeSlotDTOS: [...formData.doctorTimeSlotDTOS, { ...timeSlot }]
    });

    // Reset the time slot form
    setTimeSlot({
      date: '',
      time: ''
    });

    // Clear any error messages
    setError('');
  };

  const removeTimeSlot = (index) => {
    const updatedTimeSlots = [...formData.doctorTimeSlotDTOS];
    updatedTimeSlots.splice(index, 1);

    setFormData({
      ...formData,
      doctorTimeSlotDTOS: updatedTimeSlots
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Log the form data to verify that time slots are included
    console.log('Submitting doctor data with time slots:', formData);

    try {
      await DoctorService.createDoctor(formData);
      setSuccess('Doctor created successfully!');
      setFormData({
        userDTO: {
          email: '',
          password: '',
          name: '',
          surname: '',
          phoneNumber: '',
          role: 'DOCTOR'
        },
        specializationId: '',
        hospitalId: '',
        doctorTimeSlotDTOS: []
      });
    } catch (err) {
      setError('Failed to create doctor. Please try again.');
      console.error('Doctor creation error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h3>Create New Doctor</h3>

      <Form onSubmit={handleSubmit}>
        <h4 className="mt-4">Personal Information</h4>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.userDTO.name}
                onChange={handleUserChange}
                required
                placeholder="Enter first name"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={formData.userDTO.surname}
                onChange={handleUserChange}
                required
                placeholder="Enter last name"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.userDTO.email}
                onChange={handleUserChange}
                required
                placeholder="Enter email"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.userDTO.password}
                onChange={handleUserChange}
                required
                placeholder="Enter password"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type="tel"
            name="phoneNumber"
            value={formData.userDTO.phoneNumber}
            onChange={handleUserChange}
            required
            placeholder="Enter phone number"
          />
        </Form.Group>

        <h4 className="mt-4">Professional Information</h4>
        {fetchingData ? (
          <div className="text-center my-4">
            <p>Loading specializations and hospitals...</p>
          </div>
        ) : (
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Specialization</Form.Label>
                <Form.Select
                  name="specializationId"
                  value={formData.specializationId}
                  onChange={handleChange}
                  required
                  disabled={fetchingData || specializations.length === 0}
                >
                  <option value="">-- Select a specialization --</option>
                  {specializations.map(spec => (
                    <option key={spec.id} value={spec.id}>{spec.specializationName}</option>
                  ))}
                </Form.Select>
                {specializations.length === 0 && !fetchingData && (
                  <Form.Text className="text-danger">
                    No specializations available. Please check the database.
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Hospital</Form.Label>
                <Form.Select
                  name="hospitalId"
                  value={formData.hospitalId}
                  onChange={handleChange}
                  required
                  disabled={fetchingData || hospitals.length === 0}
                >
                  <option value="">-- Select a hospital --</option>
                  {hospitals.map(hospital => (
                    <option key={hospital.id} value={hospital.id}>{hospital.hospitalName}</option>
                  ))}
                </Form.Select>
                {hospitals.length === 0 && !fetchingData && (
                  <Form.Text className="text-danger">
                    No hospitals available. Please check the database.
                  </Form.Text>
                )}
              </Form.Group>
            </Col>
          </Row>
        )}

        <h4 className="mt-4">Appointment Slots</h4>
        <p className="text-muted">Add available time slots for appointments with this doctor.</p>
        <p className="text-muted"><small>Note: The time slots will be saved along with the doctor information.</small></p>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={timeSlot.date}
                onChange={handleTimeSlotChange}
                min={new Date().toISOString().split('T')[0]} // Prevent selecting past dates
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                value={timeSlot.time}
                onChange={handleTimeSlotChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Button 
          variant="secondary" 
          onClick={addTimeSlot} 
          className="mb-3"
          disabled={!timeSlot.date || !timeSlot.time}
        >
          + Add to List
        </Button>

        {formData.doctorTimeSlotDTOS.length > 0 && (
          <div className="mt-3">
            <div className="d-flex justify-content-between align-items-center mb-2">
              <h5 className="mb-0">Added Time Slots: ({formData.doctorTimeSlotDTOS.length})</h5>
              {formData.doctorTimeSlotDTOS.length > 3 && (
                <small className="text-muted">Scroll to see more</small>
              )}
            </div>
            <div className="list-group" style={{ maxHeight: '200px', overflowY: 'auto', border: '1px solid #dee2e6', borderRadius: '0.25rem' }}>
              {formData.doctorTimeSlotDTOS.map((slot, index) => (
                <div key={index} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center py-2">
                  <span>
                    Date: {slot.date} | Time: {slot.time}
                  </span>
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    onClick={() => removeTimeSlot(index)}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <Button 
          variant="primary" 
          type="submit" 
          disabled={loading || fetchingData || specializations.length === 0 || hospitals.length === 0} 
          className="mt-3"
        >
          {loading ? 'Creating...' : fetchingData ? 'Loading Data...' : 'Create Doctor'}
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}
    </div>
  );
};

export default DoctorForm;
