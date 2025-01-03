import React, { useState } from "react";
import { Box, TextField, Container, Button } from '@mui/material';
import FormManager from "./FormManager";

const ContactForm = () => {
  const initialState = { name: "", email: "", message: "" };
  const validateFields = (fields:any) => {
    const errors = { name: "", email: "", message: "" };
    if (!fields.name.trim()) errors.name = "Name is required.";
    if (!fields.email.trim()) errors.email = "Email is required.";
    if (!fields.message.trim()) errors.message = "Message is required.";
    return errors;
  };
  const { inputs, errors, handleChange, validate, resetForm } = FormManager(
    initialState,
    validateFields
  );
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form submitted:", inputs);
      // Reset form fields
      resetForm();
    }
  };
    
    return(
        <>
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
                label="Multiline"
                multiline
                error={Boolean(errors.message)}
                helperText={errors.message}
                rows={4}
                margin="dense"
                placeholder="Message"
                fullWidth
            /> 
            <div>
                <Button variant="contained" type="submit" sx={{margin:3}}>Submit</Button>
            </div>
        </form>     
        </Box>
        </Container>
        </>
    );
}

export default ContactForm;