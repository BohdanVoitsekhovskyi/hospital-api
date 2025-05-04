import React, { useState, useEffect } from 'react';
import { Card, Button, Alert, Spinner, Row, Col, ListGroup } from 'react-bootstrap';
import DoctorService from '../services/DoctorService';
import AppointmentForm from './AppointmentForm';
import { FaStar, FaRegStar, FaUserMd } from 'react-icons/fa';

const DoctorDetails = ({ doctorId, onBack }) => {
  const [doctor, setDoctor] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [averageRating, setAverageRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAppointmentForm, setShowAppointmentForm] = useState(false);

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        setLoading(true);
        const data = await DoctorService.getDoctorById(doctorId);
        setDoctor(data);

        // Fetch reviews for the doctor
        const reviewsData = await DoctorService.getDoctorReviews(doctorId);
        setReviews(reviewsData);

        // Calculate average rating
        const avgRating = DoctorService.calculateAverageRating(reviewsData);
        setAverageRating(avgRating);

        setError('');
      } catch (err) {
        setError('Failed to load doctor details. Please try again later.');
        console.error('Error fetching doctor details:', err);
      } finally {
        setLoading(false);
      }
    };

    if (doctorId) {
      fetchDoctorDetails();
    }
  }, [doctorId]);

  const handleMakeAppointment = () => {
    setShowAppointmentForm(true);
  };

  // Helper function to render star ratings
  const renderStarRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FaStar key={i} className="text-warning" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-warning" />);
      }
    }
    return stars;
  };

  if (loading) {
    return (
      <div className="text-center p-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <Alert variant="danger">{error}</Alert>
        <Button variant="secondary" onClick={onBack}>Back to Doctors List</Button>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div>
        <Alert variant="warning">Doctor not found.</Alert>
        <Button variant="secondary" onClick={onBack}>Back to Doctors List</Button>
      </div>
    );
  }

  if (showAppointmentForm) {
    return (
      <div>
        <Button variant="secondary" className="mb-3" onClick={() => setShowAppointmentForm(false)}>
          Back to Doctor Details
        </Button>
        <AppointmentForm preselectedDoctorId={doctor.id} />
      </div>
    );
  }

  return (
    <div>
      <Button variant="secondary" className="mb-3" onClick={onBack}>
        Back to Doctors List
      </Button>

      <Card className="mb-4">
        <Card.Header as="h5">
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center">
              <div className="me-3">
                <FaUserMd size={50} className="text-primary" />
              </div>
              <span>{doctor.users.name} {doctor.users.surname}</span>
            </div>
            <div>
              {renderStarRating(doctor.rating || averageRating)}
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>Specialization: {doctor.specialization.specializationName}</Card.Title>

          {doctor.education && (
            <Card.Text>
              <strong>Education:</strong> {doctor.education}
            </Card.Text>
          )}

          {doctor.experience && (
            <Card.Text>
              <strong>Experience:</strong> {doctor.experience} years
            </Card.Text>
          )}

          {doctor.bio && (
            <Card.Text>
              <strong>About:</strong> {doctor.bio}
            </Card.Text>
          )}

          {doctor.languages && (
            <Card.Text>
              <strong>Languages:</strong> {doctor.languages}
            </Card.Text>
          )}

          {doctor.officeHours && (
            <Card.Text>
              <strong>Office Hours:</strong> {doctor.officeHours}
            </Card.Text>
          )}

          <Button 
            variant="primary" 
            onClick={handleMakeAppointment}
            className="mt-3 btn-lg"
            size="lg"
          >
            Make an Appointment
          </Button>
        </Card.Body>
      </Card>

      {/* Reviews Section */}
      <Card>
        <Card.Header as="h5">
          <div className="d-flex justify-content-between align-items-center">
            <span>Patient Reviews</span>
            <div>
              {renderStarRating(averageRating)}
              <span className="ms-2">({reviews.length} reviews)</span>
            </div>
          </div>
        </Card.Header>
        <Card.Body>
          {reviews.length === 0 ? (
            <Alert variant="info">No reviews yet for this doctor.</Alert>
          ) : (
            <ListGroup variant="flush">
              {reviews.map(review => (
                <ListGroup.Item key={review.id}>
                  <div className="d-flex justify-content-between align-items-center mb-1">
                    <strong>{review.patientName}</strong>
                    <small className="text-muted">{review.date}</small>
                  </div>
                  <div className="mb-2">
                    {renderStarRating(review.rating)}
                  </div>
                  <p className="mb-0">{review.comment}</p>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default DoctorDetails;
