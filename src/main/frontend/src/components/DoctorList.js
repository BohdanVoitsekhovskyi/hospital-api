import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Button, Alert, Form, Row, Col, Container } from 'react-bootstrap';
import DoctorService from '../services/DoctorService';
import { FaStar, FaRegStar, FaUserMd } from 'react-icons/fa';

const DoctorList = ({ onSelectDoctor }) => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  // Helper function to render clickable star ratings for filter
  const renderClickableStarRating = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span 
          key={i} 
          onClick={() => handleStarClick(i)} 
          style={{ cursor: 'pointer', fontSize: '1.5rem' }}
        >
          {i <= selectedRating ? 
            <FaStar className="text-warning" /> : 
            <FaRegStar className="text-warning" />}
        </span>
      );
    }
    return stars;
  };

  // Handle star click for filter
  const handleStarClick = (rating) => {
    // If the same star is clicked again, clear the filter
    const newRating = rating === selectedRating ? 0 : rating;
    setSelectedRating(newRating);
    setFilters({
      ...filters,
      minRating: newRating === 0 ? '' : newRating.toString()
    });
  };

  // Filter states
  const [filters, setFilters] = useState({
    specializationId: '',
    minRating: '',
    hospitalId: '',
    city: ''
  });

  // State for star rating filter
  const [selectedRating, setSelectedRating] = useState(0);

  // State for dropdown data
  const [specializations, setSpecializations] = useState([]);
  const [cities, setCities] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);

  // Loading states for dropdowns
  const [loadingSpecializations, setLoadingSpecializations] = useState(true);
  const [loadingCities, setLoadingCities] = useState(true);
  const [loadingHospitals, setLoadingHospitals] = useState(true);


  // Fetch doctors, specializations, cities, and hospitals on component mount
  useEffect(() => {
    fetchDoctors();
    fetchFilterData();
  }, []);

  // Fetch filter data (specializations, cities, hospitals)
  const fetchFilterData = async () => {
    try {
      // Set loading states
      setLoadingSpecializations(true);
      setLoadingCities(true);
      setLoadingHospitals(true);

      // Fetch specializations
      const specializationsData = await DoctorService.getAllSpecializations();
      console.log('Specializations data:', specializationsData);
      setSpecializations(specializationsData.map(spec => ({
        id: spec.id,
        name: spec.specializationName
      })));
      setLoadingSpecializations(false);
      console.log('Mapped specializations:', specializations);

      // Fetch cities
      const citiesData = await DoctorService.getAllCities();
      console.log('Cities data:', citiesData);
      setCities(citiesData);
      setLoadingCities(false);
      console.log('Set cities:', cities);

      // Fetch all hospitals
      const hospitalsData = await DoctorService.getHospitals();
      console.log('Hospitals data:', hospitalsData);
      const mappedHospitals = hospitalsData.map(hospital => ({
        id: hospital.id,
        name: hospital.hospitalName,
        city: hospital.address ? hospital.address.city : ''
      }));
      setHospitals(mappedHospitals);
      setFilteredHospitals(mappedHospitals);
      setLoadingHospitals(false);
      console.log('Mapped hospitals:', mappedHospitals);
    } catch (err) {
      // Set loading states to false on error
      setLoadingSpecializations(false);
      setLoadingCities(false);
      setLoadingHospitals(false);
      setError('Failed to load filter data. Please try again later.');
      console.error('Error fetching filter data:', err);
    }
  };

  // Update filtered hospitals when city changes
  useEffect(() => {
    // Don't filter if hospitals are still loading
    if (loadingHospitals) return;

    if (filters.city) {
      // If a city is selected, filter hospitals by that city
      const filtered = hospitals.filter(hospital => hospital.city === filters.city);
      setFilteredHospitals(filtered);

      // If the currently selected hospital is not in the filtered list, clear the selection
      if (filters.hospitalId && !filtered.some(h => h.id.toString() === filters.hospitalId)) {
        setFilters(prev => ({ ...prev, hospitalId: '' }));
      }
    } else {
      // If no city is selected, show all hospitals
      setFilteredHospitals(hospitals);
    }
  }, [filters.city, hospitals, loadingHospitals]);

  const fetchDoctors = async (filterParams = null) => {
    try {
      setLoading(true);
      let data;

      if (filterParams) {
        data = await DoctorService.getFilteredDoctors(filterParams);
      } else {
        data = await DoctorService.getAllDoctors();
      }

      setDoctors(data);
      setError('');
    } catch (err) {
      setError('Failed to load doctors. Please try again later.');
      console.error('Error fetching doctors:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const applyFilters = (e) => {
    e.preventDefault();

    // Create a new object with only non-empty values
    const activeFilters = {};
    Object.keys(filters).forEach(key => {
      if (filters[key]) {
        activeFilters[key] = filters[key];
      }
    });

    fetchDoctors(activeFilters);
  };

  const resetFilters = () => {
    setFilters({
      specializationId: '',
      minRating: '',
      hospitalId: '',
      city: ''
    });
    setSelectedRating(0);
    setFilteredHospitals(hospitals); // Reset filtered hospitals to show all hospitals

    // Reset loading states to ensure dropdowns are enabled
    setLoadingSpecializations(false);
    setLoadingCities(false);
    setLoadingHospitals(false);

    fetchDoctors();
  };

  if (loading) {
    return <div className="text-center">Loading doctors...</div>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container fluid>
      <Card className="mb-4">
        <Card.Header as="h5">Filter Doctors</Card.Header>
        <Card.Body>
          <Form onSubmit={applyFilters}>
            <Row>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Specialization
                    {loadingSpecializations && <span className="ms-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                  </Form.Label>
                  <Form.Select 
                    name="specializationId" 
                    value={filters.specializationId}
                    onChange={handleFilterChange}
                    disabled={loadingSpecializations}
                  >
                    <option value="">All Specializations</option>
                    {specializations.length === 0 && !loadingSpecializations ? (
                      <option disabled>No specializations available</option>
                    ) : (
                      specializations.map(spec => (
                        <option key={spec.id} value={spec.id}>{spec.name}</option>
                      ))
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>Minimum Rating</Form.Label>
                  <div className="d-flex align-items-center">
                    {renderClickableStarRating()}
                  </div>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    Hospital
                    {loadingHospitals && <span className="ms-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                  </Form.Label>
                  <Form.Select 
                    name="hospitalId" 
                    value={filters.hospitalId}
                    onChange={handleFilterChange}
                    disabled={loadingHospitals}
                  >
                    <option value="">All Hospitals</option>
                    {filteredHospitals.length === 0 && !loadingHospitals ? (
                      <option disabled>No hospitals available</option>
                    ) : (
                      filteredHospitals.map(hospital => (
                        <option key={hospital.id} value={hospital.id}>{hospital.name}</option>
                      ))
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="mb-3">
                  <Form.Label>
                    City
                    {loadingCities && <span className="ms-2 spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>}
                  </Form.Label>
                  <Form.Select 
                    name="city" 
                    value={filters.city}
                    onChange={handleFilterChange}
                    disabled={loadingCities}
                  >
                    <option value="">All Cities</option>
                    {cities.length === 0 && !loadingCities ? (
                      <option disabled>No cities available</option>
                    ) : (
                      cities.map(city => (
                        <option key={city} value={city}>{city}</option>
                      ))
                    )}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={resetFilters}>
                Reset Filters
              </Button>
              <Button variant="primary" type="submit">
                Apply Filters
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header as="h5">
          Available Doctors {doctors.length > 0 && `(${doctors.length})`}
        </Card.Header>
        {doctors.length === 0 ? (
          <Card.Body>
            <Alert variant="info">No doctors match your filter criteria. Try adjusting your filters.</Alert>
          </Card.Body>
        ) : (
          <ListGroup variant="flush">
            {doctors.map(doctor => (
              <ListGroup.Item key={doctor.id} className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                  <div className="me-3">
                    <FaUserMd size={40} className="text-primary" />
                  </div>
                  <div className="w-100">
                    <h6 className="text-start fw-bold">{doctor.users.name} {doctor.users.surname}</h6>
                    <small className="text-muted d-block fw-bold text-start">Specialization: {doctor.specialization.specializationName}</small>
                    {(doctor.rating !== null && doctor.rating !== undefined) ? (
                      <small className="text-muted d-block fw-bold text-start">Rating: {renderStarRating(doctor.rating)}</small>
                    ) : (
                      <small className="text-muted d-block fw-bold text-start">Rating: {renderStarRating(0)}</small>
                    )}
                    {doctor.hospital && (
                      <small className="text-muted d-block fw-bold text-start">Hospital: {doctor.hospital.hospitalName}</small>
                    )}
                  </div>
                </div>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  onClick={() => onSelectDoctor(doctor.id)}
                >
                  View Details
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Card>
    </Container>
  );
};

export default DoctorList;
