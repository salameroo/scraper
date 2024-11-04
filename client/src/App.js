import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import AddOrigenForm from './pages/AddOrigenForm';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/add-origen" element={<AddOrigenForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
