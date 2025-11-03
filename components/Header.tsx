
import React, { useState } from 'react';
import { useAuth } from '../auth';
import GoogleIcon from './icons/GoogleIcon';

interface HeaderProps {
    searchQuery: string;
    onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
    const { isLoggedIn, signInWithGoogle, logout, loading, error, currentUser } = useAuth();

    return (
        <header className="bg-white shadow-md sticky top-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <a href="/" className="text-2xl font-bold text-primary">FarmFresh</a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="#about" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">About</a>
                            <a href="#products" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Products</a>
                            <a href="#contact" className="text-gray-600 hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="relative hidden md:block mr-4">
                            <input 
                                type="search"
                                value={searchQuery}
                                onChange={(e) => onSearchChange(e.target.value)}
                                placeholder="Search products..."
                                className="bg-gray-100 rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        
                        {loading ? (
                            <p>Loading...</p>
                        ) : isLoggedIn ? (
                            <div className="flex items-center">
                                <span className="mr-4">Welcome, {currentUser?.displayName || 'Admin'}</span>
                                <button 
                                    onClick={logout} 
                                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full transition duration-300">
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button 
                                onClick={signInWithGoogle} 
                                className="flex items-center justify-center bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition duration-300">
                                <GoogleIcon className="w-5 h-5 mr-2"/>
                                Admin Login
                            </button>
                        )}
                         {error && <p className="text-red-500 ml-4">{error}</p>}
                    </div>
                </div>
            </div>
        </header>
    );
};
