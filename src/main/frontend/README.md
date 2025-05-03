# Hospital Management System - Frontend

This is the frontend application for the Hospital Management System. It's built with React and communicates with the Spring Boot backend API.

## Features

- User authentication (login and registration)
- Role-based access control (Patient, Doctor, Admin)
- Integration with Spring Boot backend

## Project Structure

```
frontend/
├── public/                # Static files
│   ├── index.html         # HTML entry point
│   └── manifest.json      # Web app manifest
├── src/                   # Source code
│   ├── pages/             # React components for pages
│   │   └── AuthPage.js    # Authentication page (login/register)
│   ├── services/          # API services
│   │   └── AuthService.js # Authentication service
│   ├── App.js             # Main application component
│   ├── App.css            # Application styles
│   ├── index.js           # JavaScript entry point
│   └── index.css          # Global styles
└── package.json           # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js and npm installed

### Installation

1. Navigate to the frontend directory:
   ```
   cd src/main/frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

The application will be available at http://localhost:3000.

## API Integration

The frontend communicates with the Spring Boot backend API. The API endpoints used are:

- `/api/auth/login` - User login
- `/api/auth/register` - User registration

The proxy is configured in package.json to forward API requests to the backend server running on port 8080.

## Authentication Flow

1. User enters credentials in the login form or registration details in the register form
2. The form data is sent to the corresponding API endpoint
3. If successful, the user data is stored in localStorage
4. The user is then considered authenticated and can access protected routes