
import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 text-gray-600 border-t">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm mb-4 sm:mb-0">
            <span className="font-bold text-lg text-primary">FarmFresh</span>
            <p className="text-gray-500">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
          </div>
          <div className="flex space-x-6">
            <a href="#about" className="hover:underline">About</a>
            <a href="#products" className="hover:underline">Products</a>
            <a href="#contact" className="hover:underline">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
