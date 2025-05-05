import React, { useState, useEffect } from 'react';
import { Form, Button, Alert, Card, InputGroup, Modal } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import AuthService from '../services/AuthService';
import UserService from '../services/UserService';

const UserProfileForm = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    surname: '',
    phoneNumber: ''
  });
  const [updateData, setUpdateData] = useState(null);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Create a copy of formData to avoid modifying the original
    const dataToUpdate = { ...formData };

    // If password is empty, remove it from the update data
    if (!dataToUpdate.password) {
      delete dataToUpdate.password;
    }

    // Store the update data and show confirmation modal
    setUpdateData(dataToUpdate);
    setShowConfirmModal(true);
  };

  const handleConfirmUpdate = async () => {
    setShowConfirmModal(false);
    setLoading(true);

    try {
      // Make sure updateData is not null
      if (updateData) {
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
      }
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Profile update error:', err);
    } finally {
      setLoading(false);
      setUpdateData(null); // Reset updateData after the operation
    }
  };

  const handleCancelUpdate = () => {
    setShowConfirmModal(false);
    setUpdateData(null);
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h3>Edit Profile</h3>
          <Form onSubmit={handleFormSubmit}>
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
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Leave blank to keep current password"
                />
                <InputGroup.Text 
                  onClick={togglePasswordVisibility}
                  style={{ cursor: 'pointer' }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </InputGroup.Text>
              </InputGroup>
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

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={handleCancelUpdate} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Profile Update</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to update your profile information?</p>
          <p>This action will change your account details.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelUpdate}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleConfirmUpdate}>
            Confirm Update
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserProfileForm;
