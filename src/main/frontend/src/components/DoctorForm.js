import React, { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';
import DoctorService from '../services/DoctorService';

const DoctorForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
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
    hospitalId: ''
  });

  // Mock data for dropdowns (in a real app, these would come from API)
  const specializations = [
    { id: 1, name: 'Cardiology' },
    { id: 2, name: 'Neurology' },
    { id: 3, name: 'Pediatrics' },
    { id: 4, name: 'Dermatology' },
    { id: 5, name: 'Orthopedics' }
  ];

  const hospitals = [
    { id: 1, name: 'General Hospital' },
    { id: 2, name: 'Children\'s Hospital' },
    { id: 3, name: 'University Medical Center' }
  ];

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

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
        hospitalId: ''
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
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Specialization</Form.Label>
              <Form.Select
                name="specializationId"
                value={formData.specializationId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select a specialization --</option>
                {specializations.map(spec => (
                  <option key={spec.id} value={spec.id}>{spec.name}</option>
                ))}
              </Form.Select>
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
              >
                <option value="">-- Select a hospital --</option>
                {hospitals.map(hospital => (
                  <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" disabled={loading} className="mt-3">
          {loading ? 'Creating...' : 'Create Doctor'}
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}
    </div>
  );
};

export default DoctorForm;