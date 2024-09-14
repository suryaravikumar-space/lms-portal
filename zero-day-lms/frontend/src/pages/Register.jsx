import React, { useState } from "react";
import { TextField, Button, Container, Alert, AlertTitle } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Add this for navigation

const Register = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirm_password) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post("/api/users/register", formData);
      console.log(response.data);
      setSuccess(true);
    } catch (error) {
      console.error("Error registering user", error);
      setError("Error registering user");
    }
  };

  const handleLoginClick = () => {
    navigate("/login"); 
  };

  return (
    <Container>
      <h2>Register</h2>
      {success && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Registered successfully!
        </Alert>
      )}

      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Confirm Password"
          name="confirm_password"
          type="password"
          value={formData.confirm_password}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Register
        </Button>
      </form>
      <p>Already have an account?</p>
      <Button
        variant="contained" 
        color="primary"
        onClick={handleLoginClick}
      >
        Login
      </Button>
    </Container>
  );
};

export default Register;
