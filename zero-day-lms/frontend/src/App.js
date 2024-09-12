
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from '@mui/material';
import Register from './pages/Register';
import Login from './pages/Login'; // Placeholder for future development
import Dashboard from './pages/Dashboard'; // Placeholder for future development
import NavBar from './components/NavBar'; // Placeholder for the navigation bar

function App() {
  return (
    <Router>
      <NavBar /> {/* Placeholder for navigation bar */}
      <Container>
        <Routes>
          {/* Define the route for registration */}
          <Route path="/register" element={<Register />} />
          
          {/* Placeholder routes for login and dashboard */}
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
