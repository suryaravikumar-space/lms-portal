import React, { useState } from "react";
import { TextField, Button, Container, Alert, AlertTitle } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post("/api/users/login", formData);

      if (response.data.success) {
        // Handle successful login, e.g., store token, redirect user
        console.log("Login successful:", response.data);
        setSuccess(true);
        setError(""); // Clear any previous errors
        // Optionally store the token and redirect user
        localStorage.setItem("token", response.data.token);
        // Redirect to another page if necessary
      } else {
        setSuccess(false);
        setError(response.data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in user", error);
      setSuccess(false);
      setError("Error logging in user");
    }
  };

  const handleRegisterClick = () => {
    navigate("/Register"); 
  };

  return (
    <Container>
      <h2>Login</h2>
      {success && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          Login successful!
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
          label="Email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="email"
          required
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="normal"
          required
        />
        <Button type="submit" variant="contained" color="primary">
          Login
        </Button>
      </form>
      <p>Don't have an account?</p>
      <Button
        variant="contained" 
        color="primary"
        onClick={handleRegisterClick}
      >
        Register
      </Button>
    </Container>
  );
};

export default Login;
