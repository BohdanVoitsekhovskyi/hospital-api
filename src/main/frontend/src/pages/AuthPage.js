import React, { useState } from 'react';
import { Container, Tab, Tabs, Form, Button, Alert } from 'react-bootstrap';
import AuthService from '../services/AuthService';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    phoneNumber: '',
    role: 'PATIENT'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const userData = await AuthService.login(loginData);
      setSuccess('Login successful!');
      console.log('Login response:', userData);

      // Redirect based on user role
      if (userData.role === 'PATIENT') {
        window.location.href = '/patient';
      } else if (userData.role === 'DOCTOR') {
        window.location.href = '/doctor';
      } else if (userData.role === 'ADMIN') {
        window.location.href = '/admin';
      } else {
        console.error('Unknown role:', userData.role);
      }
    } catch (err) {
      setError(err.response?.data || 'Login failed. Please try again.');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const userData = await AuthService.register(registerData);
      setSuccess('Registration successful! You can now login.');
      setActiveTab('login');
      console.log('Register response:', userData);
    } catch (err) {
      setError(err.response?.data || 'Registration failed. Please try again.');
      console.error('Register error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="auth-container">
      <h1 className="text-center mb-4">Hospital Management System</h1>

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="auth-tabs"
      >
        <Tab eventKey="login" title="Login">
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                required
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={loginData.password}
                onChange={handleLoginChange}
                required
                placeholder="Enter your password"
              />
            </Form.Group>

            <Button variant="primary" type="submit" disabled={loading} className="w-100">
              {loading ? 'Logging in...' : 'Login'}
            </Button>
          </Form>
        </Tab>

        <Tab eventKey="register" title="Register">
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={registerData.email}
                onChange={handleRegisterChange}
                required
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={registerData.password}
                onChange={handleRegisterChange}
                required
                placeholder="Create a password"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={registerData.name}
                onChange={handleRegisterChange}
                required
                placeholder="Enter your first name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="surname"
                value={registerData.surname}
                onChange={handleRegisterChange}
                required
                placeholder="Enter your last name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                value={registerData.phoneNumber}
                onChange={handleRegisterChange}
                required
                placeholder="Enter your phone number"
              />
            </Form.Group>


            <Button variant="primary" type="submit" disabled={loading} className="w-100">
              {loading ? 'Registering...' : 'Register'}
            </Button>
          </Form>
        </Tab>
      </Tabs>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}
    </Container>
  );
};

export default AuthPage;
