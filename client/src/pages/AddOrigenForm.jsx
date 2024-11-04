'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Globe, Link, User, FileText, Eye } from 'lucide-react'
import Button from "../components/ui/ButtonOriginSubmit"
import CookiePopup from "../components/ui/CookiePopup"

// Componente Card y CardContent
export const Card = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div className={`bg-white shadow-md rounded-lg ${className}`} ref={ref} {...props} />
    );
});
Card.displayName = 'Card';

export const CardContent = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div className={`p-6 ${className}`} ref={ref} {...props} />
    );
});
CardContent.displayName = 'CardContent';

const Input = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
            ref={ref}
            {...props}
        />
    )
})
Input.displayName = 'Input'

const Label = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <label
            className={`block text-sm font-medium text-gray-700 ${className}`}
            ref={ref}
            {...props}
        />
    )
})
Label.displayName = 'Label'

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <textarea
            className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
            ref={ref}
            {...props}
        />
    )
})
Textarea.displayName = 'Textarea'

const Select = React.forwardRef(({ className, children, ...props }, ref) => {
    return (
        <select
            className={`px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${className}`}
            ref={ref}
            {...props}
        >
            {children}
        </select>
    )
})
Select.displayName = 'Select';

export default function Component() {
    const [formData, setFormData] = useState({
        url: '',
        nombre: '',
        uso: '',
        descripcion: ''
    });

    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState('');

    // Mostrar el popup la primera vez si el usuario no seleccionó "No mostrar más"
    useEffect(() => {
        const popupPreference = localStorage.getItem('showAddOriginPopup');
        if (popupPreference !== 'false') {
            setShowPopup(true);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {


        // Validación de la URL
        const urlPattern = /^(http:\/\/|https:\/\/)/;
        if (!urlPattern.test(formData.url)) {
            setError("La URL debe comenzar con 'http://' o 'https://'");
            return;
        }

        setError(''); // Limpiar el error si la URL es válida

        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/origenes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            const result = await response.json();
            console.log('Respuesta de la API:', result.mensaje);
        } else {
            const errorData = await response.json();
            console.error('Error al agregar el origen:', errorData.mensaje);
        }
    };

    const handlePopupClose = (dontShowAgain) => {
        console.log(dontShowAgain ? "El popup no se mostrará más" : "El popup puede mostrarse nuevamente");
    };

    return (
        <div>
            <div className="min-h-screen bg-gradient-to-br from-purple-100 to-indigo-200 flex items-center justify-center p-4">
                <Card className="w-full max-w-4xl bg-white/80 backdrop-blur-sm shadow-xl rounded-2xl overflow-hidden">
                    <CardContent className="p-0">
                        <div className="grid md:grid-cols-2 gap-0">
                            <motion.div
                                className="p-6 space-y-4"
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <h2 className="text-2xl font-bold text-gray-800">Añadir Origen URL</h2>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2 w-full">
                                        <Label htmlFor="url">URL</Label>
                                        <div className="relative w-full">
                                            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                id="url"
                                                name="url"
                                                value={formData.url}
                                                onChange={handleChange}
                                                className="pl-10 w-full"
                                                placeholder="https://ejemplo.com"
                                                required
                                            />
                                        </div>
                                        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Mensaje de error */}
                                    </div>

                                    <div className="space-y-2 w-full">
                                        <Label htmlFor="nombre">Nombre</Label>
                                        <div className="relative w-full">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                id="nombre"
                                                name="nombre"
                                                value={formData.nombre}
                                                onChange={handleChange}
                                                className="pl-10 w-full"
                                                placeholder="Nombre del origen"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2 w-full">
                                        <Label htmlFor="uso">Uso</Label>
                                        <Select
                                            id="uso"
                                            name="uso"
                                            value={formData.uso}
                                            onChange={handleChange}
                                            className="w-full"
                                        >
                                            <option value="">Selecciona el uso</option>
                                            <option value="personal">Personal</option>
                                            <option value="trabajo">Trabajo</option>
                                            <option value="educacion">Educación</option>
                                            <option value="otro">Otro</option>
                                        </Select>
                                    </div>
                                    <div className="space-y-2 w-full">
                                        <Label htmlFor="descripcion">Descripción</Label>
                                        <div className="relative w-full">
                                            <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                                            <Textarea
                                                id="descripcion"
                                                name="descripcion"
                                                value={formData.descripcion}
                                                onChange={handleChange}
                                                className="pl-10 w-full"
                                                placeholder="Breve descripción del origen URL"
                                                rows={3}
                                            />
                                        </div>
                                    </div>
                                    <div className="flex justify-center py-2">
                                        <Button type="submit" className="w-auto">Añadir Origen</Button>
                                    </div>
                                </form>
                            </motion.div>
                            <motion.div
                                className="bg-gradient-to-br from-indigo-800 to-blue-600 p-6 flex flex-col justify-center items-center text-white rounded"
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                            >
                                <Eye className="mb-4" size={48} />
                                <h3 className="text-xl font-semibold mb-4">Vista Previa</h3>
                                <Card className="w-full max-w-sm bg-white/10 backdrop-blur-sm text-white p-4 rounded-lg shadow-lg">
                                    <CardContent className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <Globe size={16} />
                                            <span className="font-medium">{formData.url || 'https://ejemplo.com'}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <User size={16} />
                                            <span>{formData.nombre || 'Nombre del origen'}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Link size={16} />
                                            <span>{formData.uso || 'Uso no especificado'}</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <FileText size={16} />
                                            <span className="text-sm">{formData.descripcion || 'Descripción breve del origen URL'}</span>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Popup de aviso sobre cookies */}
            <CookiePopup onClose={handlePopupClose} />

        </div>
    )
}
