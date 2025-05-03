import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import AppointmentForm from '../components/AppointmentForm';
import AppointmentList from '../components/AppointmentList';

const PatientDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('makeAppointment');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    if (currentUser.role !== 'PATIENT') {
      // Redirect to appropriate dashboard based on role
      if (currentUser.role === 'DOCTOR') {
        navigate('/doctor');
      } else if (currentUser.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/auth');
      }
      return;
    }

    setUser(currentUser);
  }, [navigate]);

  const handleLogout = () => {
    AuthService.logout();
    navigate('/auth');
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-4">
      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center">
                <h2>Patient Dashboard</h2>
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              </div>
              <p>Welcome, {user.name} {user.surname}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Tabs
            activeKey={activeTab}
            onSelect={(k) => setActiveTab(k)}
            className="mb-3"
          >
            <Tab eventKey="makeAppointment" title="Make Appointment">
              <Card>
                <Card.Body>
                  <AppointmentForm />
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="viewAppointments" title="View Appointments">
              <Card>
                <Card.Body>
                  <AppointmentList />
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default PatientDashboard;
