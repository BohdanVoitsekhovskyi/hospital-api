import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import UserProfileForm from '../components/UserProfileForm';

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

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Body>
              <h3>Your Schedule</h3>
              <p>This is where you'll see your upcoming appointments and schedule.</p>
              <p className="text-muted">Coming soon: Calendar view with appointments.</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <h3>Edit Profile</h3>
              <UserProfileForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DoctorDashboard;
