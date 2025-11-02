
import React from 'react';
import { LeafIcon } from './icons/LeafIcon';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-brown text-white">
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8 text-center">
        <div className="flex justify-center items-center space-x-2 mb-4">
          <LeafIcon className="h-8 w-8 text-brand-green" />
          <span className="text-2xl font-bold">FarmFresh</span>
        </div>
        <p className="mb-4">Directly from Farm to Home</p>
        <div className="flex justify-center space-x-6 mb-8">
          <a href="#about" className="hover:underline">About</a>
          <a href="#products" className="hover:underline">Products</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
        <p className="text-gray-300">&copy; {new Date().getFullYear()} FarmFresh Direct. All Rights Reserved.</p>
      </div>
    </footer>
  );
};
