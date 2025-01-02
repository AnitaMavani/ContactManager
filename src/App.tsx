import React from 'react';
import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Button, Typography, Container } from "@mui/material";
import ProjectPage from './ProjectPage';
import Home from "./pages/Home";
import About from "./pages/About";
import ContactForm from './pages/ContactForm';
import Login from "./pages/Login";
import Register from './pages/Register';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  );
 
}

export default App;
