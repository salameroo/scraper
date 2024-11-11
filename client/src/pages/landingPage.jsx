// src/pages/LandingPage.js
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../components/LoginButton';

function LandingPage() {
    const { isAuthenticated, getAccessTokenSilently } = useAuth0(); // Importamos el método
    const navigate = useNavigate();

    // Redirige automáticamente al dashboard si el usuario está autenticado
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Obtenemos el token de acceso
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        audience: process.env.REACT_APP_AUTH0_API_AUDIENCE,
                        scope: "read:current_user",
                    },
                });
                console.log("Token de acceso:", token);

                // Aquí podrías usar el token para una llamada a una API si es necesario
            } catch (error) {
                console.error("Error al obtener el token:", error);
            }
        };

        if (isAuthenticated) {
            fetchData();
            navigate('/dashboard');
        }
    }, [isAuthenticated, navigate, getAccessTokenSilently]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-200">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-8 text-gray-800">WebScraper Somontano</h1>
                <div className="space-y-4">
                    {/* Botón de login/envío */}
                    <LoginButton>
                        <Link to="/add-origen">
                            <button className="px-6 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 transition duration-200">
                                Añadir Origen
                            </button>
                        </Link>
                    </LoginButton>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
