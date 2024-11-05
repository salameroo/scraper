'use client'

import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'
import { motion } from 'framer-motion'
import { LogIn, LogOut } from 'lucide-react'

const LoginButton = () => {
    const { loginWithRedirect, logout, isAuthenticated, isLoading } = useAuth0()

    const buttonVariants = {
        hover: { scale: 1.05 },
        tap: { scale: 0.95 }
    }

    if (isLoading) {
        return (
            <motion.button
                className="px-6 py-2 text-sm font-medium text-white bg-indigo-500 rounded-full shadow-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-colors duration-300"
                animate={{ opacity: 0.7 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
            >
                Loading...
            </motion.button>
        )
    }

    return (
        <motion.button
            onClick={() => isAuthenticated
                ? logout({ returnTo: window.location.origin })
                : loginWithRedirect()
            }
            className={`
        px-6 py-2 text-sm font-medium text-white rounded-full shadow-md 
        focus:outline-none focus:ring-2 focus:ring-opacity-50 
        transition-colors duration-300 flex items-center justify-center
        ${isAuthenticated
                    ? 'bg-red-500 hover:bg-red-600 focus:ring-red-500'
                    : 'bg-green-500 hover:bg-yellow-600 focus:ring-green-500'}
      `}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label={isAuthenticated ? 'Logout' : 'Login'}
        >
            {isAuthenticated ? (
                <>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                </>
            ) : (
                <>
                    <LogIn className="w-4 h-4 mr-2" />
                    Login
                </>
            )}
        </motion.button>
    )
}

export default LoginButton