import React from 'react';
import './styles/App.css';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import AppRoutes from './routes/routes';
function App() {
  return (
    <AuthProvider>
      <Header />
      <AppRoutes />
    </AuthProvider>
  );
 
}

export default App;
