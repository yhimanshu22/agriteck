import React, { useState } from 'react';
import type { Product } from '../types';
import { XCircleIcon } from './icons/XCircleIcon';

interface ProductCardProps {
  product: Product;
  isLoggedIn: boolean;
  onDelete: (id: number) => void;
  onOrder: (productName: string, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isLoggedIn, onDelete, onOrder }) => {
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState<string | null>(null);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Clear error whenever user changes the value
    if (quantityError) {
      setQuantityError(null);
    }
    setQuantity(Number(e.target.value));
  };

  const handleOrderClick = () => {
    // Ensure quantity is a positive integer
    if (!Number.isInteger(quantity) || quantity < 1) {
      setQuantityError('Must be a positive whole number.');
      return;
    }
    setQuantityError(null); // Clear error on successful validation
    onOrder(product.name, quantity);
  };


  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-2 duration-300 border border-gray-100 relative group">
      {isLoggedIn && (
        <button 
          onClick={() => onDelete(product.id)}
          className="absolute top-3 right-3 bg-white/70 rounded-full text-red-500 hover:text-red-700 hover:bg-white p-1 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
          aria-label="Delete product"
        >
          <XCircleIcon className="w-8 h-8" />
        </button>
      )}
      <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-brand-brown mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
        <div className="mt-auto">
            <p className="text-xl font-bold text-brand-green mb-4">${product.price} / {product.priceUnit}</p>
            <div className="mb-4">
                <div className="flex items-center space-x-4">
                  <label htmlFor={`quantity-${product.id}`} className="font-medium text-gray-700">Qty (kg):</label>
                  <input
                    type="number"
                    id={`quantity-${product.id}`}
                    min="1"
                    step="1"
                    value={quantity}
                    onChange={handleQuantityChange}
                    className={`w-20 px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:border-brand-green ${quantityError ? 'border-red-500 ring-red-500' : 'border-gray-300 ring-brand-green'}`}
                    aria-invalid={!!quantityError}
                    aria-describedby={quantityError ? `quantity-error-${product.id}` : undefined}
                  />
                </div>
                {quantityError && (
                    <p id={`quantity-error-${product.id}`} className="text-red-500 text-xs mt-1" role="alert">
                        {quantityError}
                    </p>
                )}
            </div>
            <button onClick={handleOrderClick} className="w-full text-center block bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
            Order Now
            </button>
        </div>
      </div>
    </div>
  );
};