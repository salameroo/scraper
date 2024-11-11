// src/pages/Dashboard.js
import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export default function Dashboard() {
    const { user, isAuthenticated, logout } = useAuth0();

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 flex flex-col items-center p-8">
            <h1 className="text-4xl font-bold mb-6 text-indigo-800">Dashboard</h1>
            {isAuthenticated && (
                <>
                    <p className="mb-4">Bienvenido, {user.name}!</p>
                    <div className="grid grid-cols-1 gap-4">
                        <button onClick={() => window.location.href = '/origenes'} className="bg-blue-600 text-white rounded-full px-6 py-3">
                            Ver Orígenes
                        </button>
                        <button onClick={() => window.location.href = '/add-origen'} className="bg-green-600 text-white rounded-full px-6 py-3">
                            Añadir Origen
                        </button>
                        {/* Agrega más botones o enlaces según las opciones que quieras ofrecer */}
                    </div>
                    <button onClick={() => logout({ returnTo: window.location.origin })} className="mt-6 bg-red-600 text-white rounded-full px-4 py-2">
                        Cerrar sesión
                    </button>
                </>
            )}
        </div>
    );
}
