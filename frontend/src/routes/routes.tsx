import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Auth from "../pages/Auth";

const AppRoutes = () => {
  return (
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Auth key="login" isRegister={false} />} />
        <Route path="/register" element={<Auth key="register" isRegister={true} />} />
      </Routes>
  );
};

export default AppRoutes;
