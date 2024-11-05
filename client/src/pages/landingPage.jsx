// src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import LoginButton from '../components/LoginButton';

function LandingPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">WebScraper Somontano</h1>
                <div className="space-y-4">
                    <LoginButton>
                        <Link to="/add-origen">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200">
                                Añadir Origen
                            </button>
                        </Link>
                    </LoginButton>
                    {/* Agrega más enlaces aquí si quieres más funcionalidades en el menú */}
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
