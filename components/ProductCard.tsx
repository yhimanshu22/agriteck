
import React from 'react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-2 duration-300 border border-gray-100">
      <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-brand-brown mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
        <div className="mt-auto">
            <p className="text-xl font-bold text-brand-green mb-4">{product.price}</p>
            <a href="#contact" className="w-full text-center block bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
            Order Now
            </a>
        </div>
      </div>
    </div>
  );
};
