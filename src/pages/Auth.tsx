import axios from 'axios';
import React, { useState, useEffect, useContext } from "react";
import { Box, TextField, Container, Button, Typography, Link } from "@mui/material";
import Validation from "./Validation";
import FormManager from "./FormManager";
import { useNavigate } from "react-router-dom";
import { AuthContext } from  './AuthContext';

type FormState = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

type AuthProps = {
  isRegister: boolean;
};

const Auth = ({ isRegister }: AuthProps) => {
  //const location = useLocation();
  //const isRegister = location.pathname === "/register";
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [isRegisterState, setIsRegisterState] = useState(isRegister);
  // const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [userName, setUserName] = useState<string>('');
  const { login } = useContext(AuthContext);

  const initialState:FormState = isRegister
    ? { name: "", email: "", password: "", confirmPassword: "" }
    : { email: "", password: "" };

  const { inputs, errors, handleChange, validate, resetForm } = FormManager(initialState);
  
  useEffect(() => {
    resetForm(initialState);
  }, [isRegister]);

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (token) {
  //     // Fetch user data using the token
  //     axios.get('http://localhost:5001/api/auth/me', {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //       .then(response => {
  //         login(response.data.name); // Update global login state
  //       })
  //       .catch(error => {
  //         console.error('Error fetching user data:', error);
  //         localStorage.removeItem('token');
  //       });
  //   }
  // }, [login]);
  
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  // const validationErrors = Validation(inputs); // Get validation errors directly
  // const isValid = validate(Validation); 

  //   if (isValid) {
  //       console.log(isRegister ? "Register sucessfull" : "Login Sucessfull", inputs);
  //       resetForm(initialState); 
  //   } else {
  //     console.log("Validation failed:", validationErrors);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
  
    if (validate(Validation)) {
      setIsLoading(true);
      try {
        const endpoint = isRegister ? '/register' : '/login';
        const response = await axios.post(
          `http://localhost:5001/api/auth/${endpoint}`,
          inputs
        );
  
        console.log(isRegisterState ? "Registration successful" : "Login successful", response.data);
        resetForm(initialState);
  
        // Redirect or handle post-login logic
        if (!isRegisterState) {
          localStorage.setItem('token', response.data.token);
          login(response.data.user.name); // Update global login state
          navigate('/'); // Example redirect
        }
      } catch (error: any) {
        setError(error.response?.data?.error || 'Something went wrong');
        console.error('Auth error:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Validation failed:", errors);
    }
  };

  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   setIsLoggedIn(false);
  //   setUserName('');
  //   navigate('/'); // Redirect to home or login page
  // };

  return (
    <>
      <Container>
        <Box
          display="flex"
          flexDirection={"column"}
          gap={5}
          alignItems="center"
          justifyContent="center"
          maxWidth={600}
          margin="auto"
          marginTop={5}
          padding={3}
          borderRadius={5}
          border={"1px solid #eee"}
        >
          <Typography variant="h4" gutterBottom>
            {isRegisterState ? "Register" : "Login"}
          </Typography>
          <form onSubmit={handleSubmit}>
            {isRegisterState && (
              <TextField
                name="name"
                value={(inputs.name) || ""}
                onChange={handleChange}
                label="Name"
                type="text"
                error={Boolean(errors.name)}
                helperText={errors.name}
                margin="dense"
                placeholder="Name"
                variant="outlined"
                fullWidth
              />
            )}
            <TextField
              name="email"
              label="Email"
              value={inputs.email || ""}
              onChange={handleChange}
              type="email"
              error={Boolean(errors.email)}
              helperText={errors.email}
              margin="dense"
              placeholder="Email"
              variant="outlined"
              fullWidth
            />
            <TextField
              name="password"
              label="Password"
              value={inputs.password || ""}
              onChange={handleChange}
              type="password"
              error={Boolean(errors.password)}
              helperText={errors.password}
              margin="dense"
              placeholder="Password"
              variant="outlined"
              fullWidth
            />
            {isRegisterState && (
              <TextField
                name="confirmPassword"
                label="Confirm Password"
                value={inputs.confirmPassword || ""}
                onChange={handleChange}
                type="password"
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword}
                margin="dense"
                placeholder="Confirm Password"
                variant="outlined"
                fullWidth
              />
            )}
            <Button
              variant="contained"
              type="submit"
              sx={{ mt: 2 }}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : (isRegister ? "Register" : "Login")}
            </Button>
          </form>
          {error && (
          <Typography color="error" variant="body2" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
          <Typography variant="body2">
            {isRegisterState ? "Already have an account? " : "New here? "}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setIsRegisterState((prev) => !prev);
                resetForm(initialState); 
              }}
            >
              {isRegisterState ? "Login" : "Register"}
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Auth;
export type { FormState };
