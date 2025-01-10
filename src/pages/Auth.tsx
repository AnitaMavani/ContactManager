import React, { useState, useEffect } from "react";
import { Box, TextField, Container, Button, Typography, Link } from "@mui/material";
import Validation from "./Validation";
import FormManager from "./FormManager";
import { useLocation } from "react-router-dom";

type FormState = {
  name?: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

const Auth = () => {
  //const location = useLocation();
  //const isRegister = location.pathname === "/register";
  const [isRegister, setIsRegister] = useState(false);

  const initialState:FormState = isRegister
    ? { name: "", email: "", password: "", confirmPassword: "" }
    : { email: "", password: "" };

  const { inputs, errors, handleChange, validate, resetForm } = FormManager(initialState);
  
  useEffect(() => {
    resetForm(initialState); 
  }, [isRegister]);
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

  const validationErrors = Validation(inputs); // Get validation errors directly
  const isValid = validate(Validation); 

    if (isValid) {
        console.log(isRegister ? "Register sucessfull" : "Login Sucessfull", inputs);
        resetForm(initialState); 
    } else {
      console.log("Validation failed:", validationErrors);
    }
  };

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
            {isRegister ? "Register" : "Login"}
          </Typography>
          <form onSubmit={handleSubmit}>
            {isRegister && (
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
            {isRegister && (
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
              sx={{ marginTop: 2}}
            >
              {isRegister ? "Register" : "Login"}
            </Button>
          </form>
          <Typography variant="body2">
            {isRegister ? "Already have an account? " : "New here? "}
            <Link
              component="button"
              variant="body2"
              onClick={() => {
                setIsRegister((prev) => !prev);
                resetForm(initialState); 
              }}
            >
              {isRegister ? "Login" : "Register"}
            </Link>
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default Auth;
export type { FormState };
