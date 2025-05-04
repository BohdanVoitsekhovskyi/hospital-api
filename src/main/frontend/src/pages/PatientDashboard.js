import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/AuthService';
import AppointmentList from '../components/AppointmentList';
import DoctorList from '../components/DoctorList';
import DoctorDetails from '../components/DoctorDetails';
import MedcardForm from '../components/MedcardForm';
import UserProfileForm from '../components/UserProfileForm';

const PatientDashboard = () => {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('doctors');
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
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
            onSelect={(k) => {
              setActiveTab(k);
              if (k !== 'doctors') {
                setSelectedDoctorId(null);
              }
            }}
            className="mb-3"
          >
            <Tab eventKey="doctors" title="Find Doctors">
              <Card>
                <Card.Body>
                  {selectedDoctorId ? (
                    <DoctorDetails 
                      doctorId={selectedDoctorId} 
                      onBack={() => setSelectedDoctorId(null)} 
                    />
                  ) : (
                    <DoctorList onSelectDoctor={(id) => setSelectedDoctorId(id)} />
                  )}
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
            <Tab eventKey="medcard" title="Medical Card">
              <Card>
                <Card.Body>
                  <MedcardForm />
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

export default PatientDashboard;
