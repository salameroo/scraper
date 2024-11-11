// src/pages/LandingPage.js
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';

function Origenes() {
    const { isAuthenticated } = useAuth0();
    const navigate = useNavigate();

    // Redirige automáticamente al dashboard si el usuario está autenticado
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
            <h1>Hola mundo</h1>
        </div>
    );
}

export default Origenes;
