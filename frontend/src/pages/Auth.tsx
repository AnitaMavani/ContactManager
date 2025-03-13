import React, { useState } from 'react';
import { Box, TextField, Container, Button, Typography, Link } from '@mui/material';
import useAuth from '../hooks/useAuth';

type AuthProps = {
  isRegister: boolean;
};

const Auth = ({ isRegister }: AuthProps) => {
  const [isRegisterState, setIsRegisterState] = useState(isRegister);
  const { inputs, errors, handleChange, isLoading, error, handleSubmit } = useAuth({ isRegister: isRegisterState });

  return (
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
              value={inputs.name || ""}
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
            {isLoading ? "Loading..." : (isRegisterState ? "Register" : "Login")}
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
            }}
          >
            {isRegisterState ? "Login" : "Register"}
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default Auth;
