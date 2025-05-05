import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import UserProfileForm from '../components/UserProfileForm';
import DoctorAppointmentList from '../components/DoctorAppointmentList';

const DoctorDashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    if (currentUser.role !== 'DOCTOR') {
      // Redirect to appropriate dashboard based on role
      if (currentUser.role === 'PATIENT') {
        navigate('/patient');
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
                <h2>Doctor Dashboard</h2>
                <Button variant="outline-danger" onClick={handleLogout}>Logout</Button>
              </div>
              <p>Welcome, Dr. {user.name} {user.surname}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Tabs defaultActiveKey="appointments" className="mb-3">
            <Tab eventKey="appointments" title="Appointments">
              <Card>
                <Card.Body>
                  <DoctorAppointmentList />
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="profile" title="Edit Profile">
              <Card>
                <Card.Body>
                  <UserProfileForm />
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDashboard;
