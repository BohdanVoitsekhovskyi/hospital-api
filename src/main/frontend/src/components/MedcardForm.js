import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Row, Col, Spinner } from 'react-bootstrap';
import PatientService from '../services/PatientService';
import AuthService from '../services/AuthService';

const MedcardForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    country: '',
    region: '',
    city: '',
    street: '',
    streetNumber: '',
    bithday: '',
    gender: ''
  });
  const [medcardId, setMedcardId] = useState(null);
  const [fetchingMedcard, setFetchingMedcard] = useState(true);

  // Mock data for dropdowns (in a real app, these would come from API)
  const countries = [
    'United States',
    'Canada',
    'United Kingdom',
    'Australia',
    'Germany',
    'France',
    'Japan',
    'Ukraine'
  ];

  const regions = {
    'United States': ['California', 'New York', 'Texas', 'Florida', 'Illinois'],
    'Canada': ['Ontario', 'Quebec', 'British Columbia', 'Alberta'],
    'United Kingdom': ['England', 'Scotland', 'Wales', 'Northern Ireland'],
    'Australia': ['New South Wales', 'Victoria', 'Queensland', 'Western Australia'],
    'Germany': ['Bavaria', 'Berlin', 'Hamburg', 'Hesse'],
    'France': ['Île-de-France', 'Provence-Alpes-Côte d\'Azur', 'Normandy', 'Brittany'],
    'Japan': ['Tokyo', 'Osaka', 'Hokkaido', 'Kyoto'],
    'Ukraine': ['Kyiv Oblast', 'Lviv Oblast', 'Odesa Oblast', 'Kharkiv Oblast']
  };

  const cities = {
    'California': ['Los Angeles', 'San Francisco', 'San Diego', 'Sacramento'],
    'New York': ['New York City', 'Buffalo', 'Rochester', 'Syracuse'],
    'Texas': ['Houston', 'Dallas', 'Austin', 'San Antonio'],
    'Florida': ['Miami', 'Orlando', 'Tampa', 'Jacksonville'],
    'Illinois': ['Chicago', 'Springfield', 'Peoria', 'Rockford'],
    'Ontario': ['Toronto', 'Ottawa', 'Hamilton', 'London'],
    'Quebec': ['Montreal', 'Quebec City', 'Laval', 'Gatineau'],
    'British Columbia': ['Vancouver', 'Victoria', 'Surrey', 'Burnaby'],
    'Alberta': ['Calgary', 'Edmonton', 'Red Deer', 'Lethbridge'],
    'England': ['London', 'Manchester', 'Birmingham', 'Liverpool'],
    'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen', 'Dundee'],
    'Wales': ['Cardiff', 'Swansea', 'Newport', 'Bangor'],
    'Northern Ireland': ['Belfast', 'Derry', 'Lisburn', 'Newry'],
    'New South Wales': ['Sydney', 'Newcastle', 'Wollongong', 'Central Coast'],
    'Victoria': ['Melbourne', 'Geelong', 'Ballarat', 'Bendigo'],
    'Queensland': ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Townsville'],
    'Western Australia': ['Perth', 'Fremantle', 'Mandurah', 'Bunbury'],
    'Bavaria': ['Munich', 'Nuremberg', 'Augsburg', 'Regensburg'],
    'Berlin': ['Berlin'],
    'Hamburg': ['Hamburg'],
    'Hesse': ['Frankfurt', 'Wiesbaden', 'Kassel', 'Darmstadt'],
    'Île-de-France': ['Paris', 'Versailles', 'Saint-Denis', 'Boulogne-Billancourt'],
    'Provence-Alpes-Côte d\'Azur': ['Marseille', 'Nice', 'Toulon', 'Aix-en-Provence'],
    'Normandy': ['Rouen', 'Le Havre', 'Caen', 'Cherbourg'],
    'Brittany': ['Rennes', 'Brest', 'Quimper', 'Vannes'],
    'Tokyo': ['Tokyo', 'Yokohama', 'Kawasaki', 'Saitama'],
    'Osaka': ['Osaka', 'Kobe', 'Kyoto', 'Sakai'],
    'Hokkaido': ['Sapporo', 'Asahikawa', 'Hakodate', 'Obihiro'],
    'Kyoto': ['Kyoto', 'Uji', 'Kameoka', 'Joyo'],
    'Kyiv Oblast': ['Kyiv', 'Bila Tserkva', 'Brovary', 'Irpin'],
    'Lviv Oblast': ['Lviv', 'Drohobych', 'Stryi', 'Chervonohrad'],
    'Odesa Oblast': ['Odesa', 'Izmail', 'Chornomorsk', 'Bilhorod-Dnistrovskyi'],
    'Kharkiv Oblast': ['Kharkiv', 'Lozova', 'Izium', 'Chuhuiv']
  };

  // State for available regions and cities based on selection
  const [availableRegions, setAvailableRegions] = useState([]);
  const [availableCities, setAvailableCities] = useState([]);

  // Fetch medical card data when component mounts
  useEffect(() => {
    const fetchMedcard = async () => {
      try {
        const user = AuthService.getCurrentUser();
        if (!user) {
          setFetchingMedcard(false);
          return;
        }

        // Try to fetch medical card with ID 1 (assuming it's the first one created)
        // In a real application, you would fetch the medical card associated with the current user
        const medcardData = await PatientService.getMedcard(1);

        if (medcardData) {
          setMedcardId(medcardData.id);

          // Update form data with the fetched medical card data
          const newFormData = {
            country: medcardData.address ? medcardData.address.country : '',
            region: medcardData.address ? medcardData.address.region : '',
            city: medcardData.address ? medcardData.address.city : '',
            street: medcardData.address ? medcardData.address.street : '',
            streetNumber: medcardData.address ? medcardData.address.streetNumber : '',
            bithday: medcardData.bithday ? medcardData.bithday : '',
            gender: medcardData.gender ? medcardData.gender : ''
          };

          setFormData(newFormData);

          // Update available regions and cities based on the fetched data
          if (newFormData.country) {
            setAvailableRegions(regions[newFormData.country] || []);

            if (newFormData.region) {
              setAvailableCities(cities[newFormData.region] || []);
            }
          }
        }
      } catch (err) {
        console.error('Error fetching medical card:', err);
        // Don't show an error to the user, just continue with an empty form
      } finally {
        setFetchingMedcard(false);
      }
    };

    fetchMedcard();
  }, []);

  // Update available regions when country changes
  useEffect(() => {
    if (formData.country) {
      setAvailableRegions(regions[formData.country] || []);
      setFormData(prev => ({ ...prev, region: '', city: '' }));
    } else {
      setAvailableRegions([]);
    }
  }, [formData.country]);

  // Update available cities when region changes
  useEffect(() => {
    if (formData.region) {
      setAvailableCities(cities[formData.region] || []);
      setFormData(prev => ({ ...prev, city: '' }));
    } else {
      setAvailableCities([]);
    }
  }, [formData.region]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // For streetNumber, convert to integer
    if (name === 'streetNumber') {
      const numValue = value === '' ? '' : parseInt(value, 10);
      setFormData({
        ...formData,
        [name]: numValue
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Validate required fields
    if (!formData.country || !formData.region || !formData.city || !formData.street || !formData.streetNumber) {
      setError('Please fill in all address fields');
      setLoading(false);
      return;
    }

    try {
      // Create address object from form data
      const addressData = {
        country: formData.country,
        region: formData.region,
        city: formData.city,
        street: formData.street,
        streetNumber: formData.streetNumber
      };

      // Create medcard data with address
      const medcardData = {
        address: addressData,
        bithday: formData.bithday,
        gender: formData.gender
      };

      // If we have a medcardId, update the existing medical card
      // Otherwise, create a new one
      if (medcardId) {
        await PatientService.updateMedcard(medcardId, medcardData);
        setSuccess('Medical card information updated successfully!');
      } else {
        const response = await PatientService.createMedcard(medcardData);
        setMedcardId(response.id);
        setSuccess('Medical card information saved successfully!');
      }
    } catch (err) {
      setError('Failed to save medical card information. Please try again.');
      console.error('Medical card error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (fetchingMedcard) {
    return (
      <div className="text-center my-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading medical card information...</p>
      </div>
    );
  }

  return (
    <div>
      <h3>Medical Card Information</h3>
      <p className="text-muted">
        {medcardId 
          ? "Your medical card information is displayed below. You can update it if needed." 
          : "Please provide your medical information for better healthcare service."}
      </p>

      <Form onSubmit={handleSubmit}>
        <h4 className="mb-3">Address Information</h4>

        {/* Country Dropdown */}
        <Form.Group className="mb-3">
          <Form.Label>Country</Form.Label>
          <Form.Select
            name="country"
            value={formData.country}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a country --</option>
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Region Dropdown - Only enabled if country is selected */}
        <Form.Group className="mb-3">
          <Form.Label>Region</Form.Label>
          <Form.Select
            name="region"
            value={formData.region}
            onChange={handleChange}
            disabled={!formData.country}
            required
          >
            <option value="">-- Select a region --</option>
            {availableRegions.map(region => (
              <option key={region} value={region}>{region}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* City Dropdown - Only enabled if region is selected */}
        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Select
            name="city"
            value={formData.city}
            onChange={handleChange}
            disabled={!formData.region}
            required
          >
            <option value="">-- Select a city --</option>
            {availableCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </Form.Select>
        </Form.Group>

        {/* Street Input */}
        <Form.Group className="mb-3">
          <Form.Label>Street</Form.Label>
          <Form.Control
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            placeholder="Enter street name"
            required
          />
        </Form.Group>

        {/* Street Number Input */}
        <Form.Group className="mb-3">
          <Form.Label>Street Number</Form.Label>
          <Form.Control
            type="number"
            name="streetNumber"
            value={formData.streetNumber}
            onChange={handleChange}
            placeholder="Enter street number"
            min="1"
            required
          />
        </Form.Group>

        <h4 className="mb-3 mt-4">Personal Information</h4>

        <Form.Group className="mb-3">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="bithday"
            value={formData.bithday}
            onChange={handleChange}
            required
            max={new Date().toISOString().split('T')[0]} // Prevent selecting future dates
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              value="MALE"
              id="gender-male"
              checked={formData.gender === 'MALE'}
              onChange={handleChange}
              inline
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              value="FEMALE"
              id="gender-female"
              checked={formData.gender === 'FEMALE'}
              onChange={handleChange}
              inline
            />
            <Form.Check
              type="radio"
              label="Prefer not to say"
              name="gender"
              value="UNKNOWN"
              id="gender-unknown"
              checked={formData.gender === 'UNKNOWN'}
              onChange={handleChange}
              inline
            />
          </div>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading}>
          {loading 
            ? 'Saving...' 
            : (medcardId 
                ? 'Update Medical Information' 
                : 'Save Medical Information')}
        </Button>
      </Form>

      {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
      {success && <Alert variant="success" className="mt-3">{success}</Alert>}
    </div>
  );
};

export default MedcardForm;
