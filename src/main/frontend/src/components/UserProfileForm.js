import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

const UserProfileForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    phoneNumber: ''
  });

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setFormData({
        email: currentUser.email || '',
        password: '', // Don't pre-fill password for security reasons
        name: currentUser.name || '',
        surname: currentUser.surname || '',
        phoneNumber: currentUser.phoneNumber || ''
      });
    }
  }, []);

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

    // Create a copy of formData to avoid modifying the original
    const updateData = { ...formData };
    
    // If password is empty, remove it from the update data
    if (!updateData.password) {
      delete updateData.password;
    }

    try {
      await UserService.updateUser(user.id, updateData);
      setSuccess('Profile updated successfully!');
      
      // Update the local user state with the new data
      const updatedUser = AuthService.getCurrentUser(); // This will get the updated user from localStorage
      setUser(updatedUser);
      
      // Clear password field after successful update
      setFormData({
        ...formData,
        password: ''
      });
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <Card.Body>
        <h3>Edit Profile</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Leave blank to keep current password"
            />
            <Form.Text className="text-muted">
              Leave blank to keep your current password.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? 'Updating...' : 'Update Profile'}
          </Button>
        </Form>

        {error && <Alert variant="danger" className="mt-3">{error}</Alert>}
        {success && <Alert variant="success" className="mt-3">{success}</Alert>}
      </Card.Body>
    </Card>
  );
};

export default UserProfileForm;