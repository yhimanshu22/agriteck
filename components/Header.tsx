
import React, { useState } from 'react';
import { LeafIcon } from './icons/LeafIcon';
import { SearchIcon } from './icons/SearchIcon';

const NavLink: React.FC<{ href: string; children: React.ReactNode, onClick: () => void }> = ({ href, children, onClick }) => (
  <a
    href={href}
    onClick={onClick}
    className="text-gray-600 hover:text-brand-green transition-colors duration-300 font-medium px-3 py-2 rounded-md"
  >
    {children}
  </a>
);

interface HeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ searchQuery, onSearchChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <a href="#home" className="flex items-center space-x-2 flex-shrink-0">
            <LeafIcon className="h-8 w-8 text-brand-green" />
            <span className="text-2xl font-bold text-gray-800 hidden sm:inline">FarmFresh</span>
            <span className="text-2xl font-bold text-gray-800 sm:hidden">FF</span>
          </a>
          
          <div className="flex-1 flex justify-center px-2 lg:ml-6">
             <div className="max-w-lg w-full lg:max-w-md">
                <label htmlFor="search" className="sr-only">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <SearchIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        id="search"
                        name="search"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-brand-green focus:border-brand-green sm:text-sm"
                        placeholder="Search products..."
                        type="search"
                        value={searchQuery}
                        onChange={(e) => onSearchChange(e.target.value)}
                    />
                </div>
            </div>
          </div>

          <div className="flex items-center">
            <nav className="hidden md:flex items-center space-x-2">
              <NavLink href="#home" onClick={closeMenu}>Home</NavLink>
              <NavLink href="#about" onClick={closeMenu}>About Us</NavLink>
              <NavLink href="#products" onClick={closeMenu}>Products</NavLink>
              <NavLink href="#testimonials" onClick={closeMenu}>Testimonials</NavLink>
              <NavLink href="#contact" onClick={closeMenu}>Contact</NavLink>
            </nav>
            <div className="md:hidden ml-2">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-brand-green"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                   <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
            <NavLink href="#home" onClick={closeMenu}>Home</NavLink>
            <NavLink href="#about" onClick={closeMenu}>About Us</NavLink>
            <NavLink href="#products" onClick={closeMenu}>Products</NavLink>
            <NavLink href="#testimonials" onClick={closeMenu}>Testimonials</NavLink>
            <NavLink href="#contact" onClick={closeMenu}>Contact</NavLink>
          </div>
        </div>
      )}
    </header>
  );
};
