import React from "react";
import { Box, TextField, Container, Button } from '@mui/material';
import FormManager from "./FormManager";
import Validation from "./Validation";

const ContactForm = () => {
  const initialState = { name: "", email: "", message: "" };

  const { inputs, errors, handleChange, validate, resetForm } = FormManager(initialState);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate(Validation)) {
      console.log("Contact form submitted:", inputs);
      resetForm(initialState);
    } else {
      console.log("Validation failed:", errors);
    }
  };

  return (
    <Container>
      <Box
        display="flex"
        flexDirection={"column"}
        alignItems="center"
        justifyContent={"center"}
        maxWidth={600}
        margin="auto"
        marginTop={5}
        padding={3}
        borderRadius={5}
        border={"1px solid #eee"}
      >
        <h2>Contact</h2>
        <form onSubmit={handleSubmit}>
          <TextField
            name="name"
            value={inputs.name}
            onChange={handleChange}
            label="Name"
            type={"text"}
            error={Boolean(errors.name)}
            helperText={errors.name}
            margin="dense"
            placeholder="Name"
            variant="outlined"
            fullWidth
          />
          <TextField
            name="email"
            value={inputs.email}
            onChange={handleChange}
            label="Email"
            type="email"
            error={Boolean(errors.email)}
            helperText={errors.email}
            margin="dense"
            placeholder="Email"
            variant="outlined"
            fullWidth
          />
          <TextField
            name="message"
            value={inputs.message}
            onChange={handleChange}
            label="Message"
            multiline
            error={Boolean(errors.message)}
            helperText={errors.message}
            rows={4}
            margin="dense"
            placeholder="Message"
            fullWidth
          />
            <Button variant="contained" type="submit" sx={{ marginTop: 2 }}>
              Submit
            </Button>
        </form>
      </Box>
    </Container>
  );
};

export default ContactForm;
