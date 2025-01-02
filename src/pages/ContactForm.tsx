import React, { useState } from "react";
import { Box, TextField, Container, Button } from '@mui/material';

const ContactForm = () => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        password:"",
        message: ""
    });
    const [errors, setErrors] = useState({
        name: "",
        email: "",
        password: "",
        message: ""
      });

    const handleChange = (e:any) => {
        setInputs((prevState) => ({ 
            ...prevState, 
            [e.target.name]: e.target.value 
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [e.target.name]: ""
          }));
    };
    const validate = () => {
        let isValid = true;
        const newErrors: { name: string; email: string; password: string; message: string } = {
            name: "",
            email: "",
            password: "",
            message: ""
          };
    
        if (!inputs.name.trim()) {
            newErrors.name = "Name is required.";
            isValid = false;
          }
          if (!inputs.email.trim()) {
            newErrors.email = "Email is required.";
            isValid = false;
          } else if (!/^[\w.%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/.test(inputs.email)) {
            newErrors.email = "Enter a valid email address.";
            isValid = false;
          }
          if (!inputs.password.trim()) {
            newErrors.password = "Password is required.";
            isValid = false;
          } else if (inputs.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters.";
            isValid = false;
          }
          if (!inputs.message.trim()) {
            newErrors.message = "Message is required.";
            isValid = false;
          }

          setErrors(newErrors);
          return isValid;
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validate()) {
          console.log("Form submitted:", inputs);
          // Reset form fields
          setInputs({
            name: "",
            email: "",
            password: "",
            message: ""
          });
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
                name="password"
                value={inputs.password}
                onChange={handleChange}
                label="Password"
                type="password"
                error={Boolean(errors.password)}
                helperText={errors.password}
                margin="dense"
                placeholder="Password"
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