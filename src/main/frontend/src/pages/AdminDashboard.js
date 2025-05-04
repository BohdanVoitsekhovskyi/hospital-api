import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import DoctorForm from '../components/DoctorForm';
import UserProfileForm from '../components/UserProfileForm';

const AdminDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('doctors');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (!currentUser) {
      navigate('/auth');
      return;
    }

    if (currentUser.role !== 'ADMIN') {
      // Redirect to appropriate dashboard based on role
      if (currentUser.role === 'PATIENT') {
        navigate('/patient');
      } else if (currentUser.role === 'DOCTOR') {
        navigate('/doctor');
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
                <h2>Admin Dashboard</h2>
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
            <Tab eventKey="doctors" title="Manage Doctors">
              <Card>
                <Card.Body>
                  <DoctorForm />
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="patients" title="Manage Patients">
              <Card>
                <Card.Body>
                  <h3>Patient Management</h3>
                  <p className="text-muted">Coming soon: Tools for managing patients.</p>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="appointments" title="Manage Appointments">
              <Card>
                <Card.Body>
                  <h3>Appointment Management</h3>
                  <p className="text-muted">Coming soon: Tools for managing appointments.</p>
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="hospitals" title="Manage Hospitals">
              <Card>
                <Card.Body>
                  <h3>Hospital Management</h3>
                  <p className="text-muted">Coming soon: Tools for managing hospitals.</p>
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

export default AdminDashboard;
