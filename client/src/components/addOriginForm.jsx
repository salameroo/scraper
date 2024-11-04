'use client'

import { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Link, User, FileText, Eye } from 'lucide-react'

export default function Component() {
    const [formData, setFormData] = useState({
        url: '',
        nombre: '',
        uso: '',
        descripcion: ''
    })
    const [mensaje, setMensaje] = useState('') // Estado para mostrar el mensaje de éxito o error

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleUsoChange = (value) => {
        setFormData(prev => ({ ...prev, uso: value }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            // Realizar la solicitud POST a la API de Express
            const response = await axios.post('http://localhost:5000/api/origenes', formData)
            setMensaje(response.data.mensaje) // Muestra el mensaje de éxito
            setFormData({ url: '', nombre: '', uso: '', descripcion: '' }) // Reiniciar el formulario
        } catch (error) {
            setMensaje(error.response?.data?.mensaje || 'Error al agregar el origen') // Muestra el mensaje de error si existe
        }
    }

    return (
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
                                <div className="space-y-2">
                                    <Label htmlFor="url" className="text-sm font-medium text-gray-700">URL</Label>
                                    <div className="relative">
                                        <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            id="url"
                                            name="url"
                                            value={formData.url}
                                            onChange={handleChange}
                                            className="pl-10"
                                            placeholder="https://ejemplo.com"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="nombre" className="text-sm font-medium text-gray-700">Nombre</Label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                        <Input
                                            id="nombre"
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            className="pl-10"
                                            placeholder="Nombre del origen"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="uso" className="text-sm font-medium text-gray-700">Uso</Label>
                                    <Select onValueChange={handleUsoChange}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Selecciona el uso" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="personal">Personal</SelectItem>
                                            <SelectItem value="trabajo">Trabajo</SelectItem>
                                            <SelectItem value="educacion">Educación</SelectItem>
                                            <SelectItem value="otro">Otro</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="descripcion" className="text-sm font-medium text-gray-700">Descripción</Label>
                                    <div className="relative">
                                        <FileText className="absolute left-3 top-3 text-gray-400" size={18} />
                                        <Textarea
                                            id="descripcion"
                                            name="descripcion"
                                            value={formData.descripcion}
                                            onChange={handleChange}
                                            className="pl-10"
                                            placeholder="Breve descripción del origen URL"
                                            rows={3}
                                        />
                                    </div>
                                </div>
                                <Button type="submit" className="w-full">Añadir Origen</Button>
                                {mensaje && <p className="text-center text-sm mt-2">{mensaje}</p>} {/* Muestra el mensaje */}
                            </form>
                        </motion.div>
                        <motion.div
                            className="bg-gradient-to-br from-indigo-500 to-purple-600 p-6 flex flex-col justify-center items-center text-white"
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
    )
}
