import React, { useState } from "react";
import { Box, TextField, Container, Button } from '@mui/material';
const Login = () => {
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
        <h2>Login</h2>
        <form>
            <TextField
                name="email"
                label="Email"
                type="email"
                margin="dense"
                placeholder="Email"
                variant="outlined"
                fullWidth
            />  
            <TextField
                name="password"
                label="Password"
                type="password"
                margin="dense"
                placeholder="Password"
                variant="outlined"
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
export default Login;