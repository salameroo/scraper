'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Button() {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <motion.button
            className="relative overflow-hidden px-8 py-2 mt-2 bg-gradient-to-r from-gray-500 to-black text-white font-bold text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
        >
            <span className="relative z-10">Añadir Origen</span>

            {/* Decoración de burbujas */}
            {[...Array(10)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-4 h-4 bg-white rounded-full opacity-0"
                    style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        scale: isHovered ? [0, 1.5, 0] : 0,
                        opacity: isHovered ? [0, 0.2, 0] : 0,
                        transition: {
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.2,
                        },
                    }}
                />
            ))}

            {/* Decoración de ondas */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <filter id="goo">
                        <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                    </filter>
                </defs>
                <motion.path
                    d="M0,50 Q25,30 50,50 T100,50 T150,50 T200,50"
                    fill="none"
                    stroke="rgba(255,255,255,0.5)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    initial={{ pathLength: 0, pathOffset: 1 }}
                    animate={{ pathLength: isHovered ? 1 : 0, pathOffset: isHovered ? 0 : 1 }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{ filter: "url(#goo)" }}
                />
            </svg>

            {/* Efecto de brillo */}
            <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0"
                initial={{ x: "-100%" }}
                animate={{ x: isHovered ? "100%" : "-100%" }}
                transition={{ duration: 1, ease: "easeInOut" }}
                style={{ mixBlendMode: "overlay" }}
            />
        </motion.button>
    )
}