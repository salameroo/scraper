// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import AddOrigenForm from './pages/AddOrigenForm';
import VistaOrigenes from './pages/origenes';
import Dashboard from './pages/dashboard';
import { Auth0Provider } from '@auth0/auth0-react';
import ProtectedRoute from './components/ProtectedRoute';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const audience = process.env.REACT_APP_AUTH0_API_AUDIENCE;

function App() {
  const onRedirectCallback = () => {
    // window.location.href = `${window.location.origin}/dashboard`; // Redirige al dashboard después de autenticarse
    window.location.href = "http://localhost:3000/dashboard";
  };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: audience,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/add-origen" element={<ProtectedRoute><AddOrigenForm /></ProtectedRoute>} />
          <Route path="/origenes" element={<ProtectedRoute><VistaOrigenes /></ProtectedRoute>} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        </Routes>
      </Router>
    </Auth0Provider>
  );
}

export default App;
