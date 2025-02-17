import React from 'react';
import logo from './logo.svg';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Button, Typography, Container } from "@mui/material";
import ProjectPage from './ProjectPage';
import Home from "./pages/Home";
import About from "./pages/About";
import ContactForm from './pages/ContactForm';
import Auth from "./pages/Auth";
import { AuthProvider } from './pages/AuthContext';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactForm />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/register" element={<Auth />} />
      </Routes>
    </>
  );
 
}

export default App;
