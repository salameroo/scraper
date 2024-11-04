'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Cookie, Check } from 'lucide-react'

export default function CookiePopup({ onClose }) {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const showPopup = localStorage.getItem('showCookiePopup') !== 'false';
        if (showPopup) {
            const timer = setTimeout(() => setIsVisible(true), 500);
            return () => clearTimeout(timer);
        }
    }, [])

    const handleClose = (dontShowAgain) => {
        setIsVisible(false);
        if (dontShowAgain) {
            localStorage.setItem('showCookiePopup', 'false');
        }
        setTimeout(() => onClose(dontShowAgain), 500);
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 50 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 50 }}
                        className="bg-white rounded-lg shadow-lg overflow-hidden max-w-md w-full"
                    >
                        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white flex items-center">
                                <Cookie className="mr-2" size={24} />
                                !Aviso!
                            </h3>
                            <button
                                onClick={() => handleClose(false)}
                                className="text-white hover:text-gray-200 transition-colors"
                                aria-label="Cerrar"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-6 text-center">
                            <p className="mb-6 text-gray-600">
                                Se abrirá una página para aceptar las cookies del origen cuando se añada. <br></br> Esto es necesario para completar el proceso y poder capturar los datos de la web.
                            </p>
                            <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-2">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleClose(true)}
                                    className="px-4 py-2 bg-gray-200 rounded-full text-gray-700 hover:bg-gray-300 transition-colors flex items-center justify-center"
                                >
                                    <X className="mr-2" size={18} />
                                    No mostrar más
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleClose(false)}
                                    className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:from-blue-600 hover:to-purple-700 transition-colors flex items-center justify-center"
                                >
                                    <Check className="mr-2" size={18} />
                                    Entendido
                                </motion.button>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
