import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AuthPage from './pages/AuthPage';
import PatientDashboard from './pages/PatientDashboard';
import DoctorDashboard from './pages/DoctorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import './App.css';
import AuthService from './services/AuthService';

function App() {
  // Function to check if user is authenticated and redirect based on role
  const ProtectedRoute = ({ element, requiredRole }) => {
    const user = AuthService.getCurrentUser();

    if (!user) {
      // Not logged in, redirect to auth page
      return <Navigate to="/auth" />;
    }

    if (requiredRole && user.role !== requiredRole) {
      // Logged in but wrong role, redirect to appropriate dashboard
      switch (user.role) {
        case 'PATIENT':
          return <Navigate to="/patient" />;
        case 'DOCTOR':
          return <Navigate to="/doctor" />;
        case 'ADMIN':
          return <Navigate to="/admin" />;
        default:
          return <Navigate to="/auth" />;
      }
    }

    // User is authenticated and has the correct role
    return element;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/patient" element={<ProtectedRoute element={<PatientDashboard />} requiredRole="PATIENT" />} />
          <Route path="/doctor" element={<ProtectedRoute element={<DoctorDashboard />} requiredRole="DOCTOR" />} />
          <Route path="/admin" element={<ProtectedRoute element={<AdminDashboard />} requiredRole="ADMIN" />} />
          <Route path="/" element={<Navigate to="/auth" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
