
import React, { useState } from 'react';
import type { Product } from '../types';
import { Modal } from './Modal'; // We'll need the modal
import TrashIcon from './icons/TrashIcon'; // And a trash icon

interface ProductCardProps {
  product: Product;
  isLoggedIn: boolean;
  onDelete: (id: number) => void;
  onOrder: (productName: string, quantity: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, isLoggedIn, onDelete, onOrder }) => {
  const [quantity, setQuantity] = useState(1);
  const [quantityError, setQuantityError] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (quantityError) {
      setQuantityError(null);
    }
    setQuantity(Number(e.target.value));
  };

  const handleOrderClick = () => {
    if (!Number.isInteger(quantity) || quantity < 1) {
      setQuantityError('Must be a positive whole number.');
      return;
    }
    setQuantityError(null);
    onOrder(product.name, quantity);
  };

  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    onDelete(product.id);
    setIsDeleteModalOpen(false);
  };

  return (
    <>
      <div className="bg-blue rounded-lg shadow-lg overflow-hidden flex flex-col transition-transform transform hover:-translate-y-2 duration-300 border border-gray-100 relative group">
        {isLoggedIn && (
          <button 
            onClick={handleDeleteClick}
            className="absolute top-3 right-3 bg-blue/70 rounded-full text-red-500 hover:text-red-700 hover:bg-white p-1.5 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 shadow-md"
            aria-label="Delete product"
          >
            <TrashIcon className="w-6 h-6" />
          </button>
        )}
        <img src={product.imageUrl} alt={product.name} className="w-full h-56 object-cover" />
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-2xl font-semibold text-brand-secondary mb-2">{product.name}</h3>
          <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
          <div className="mt-auto">
              <p className="text-xl font-bold text-brand-primary mb-4">${product.price} / {product.priceUnit}</p>
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
                      className={`w-20 px-3 py-1 border rounded-md shadow-sm focus:outline-none focus:ring-1 focus:border-brand-primary ${quantityError ? 'border-red-500 ring-red-500' : 'border-gray-300 ring-brand-primary'}`}
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
              <button onClick={handleOrderClick} className="w-full text-center block bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
              Order Now
              </button>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
        <div className="p-4 text-center">
            <TrashIcon className="w-16 h-16 mx-auto text-red-500" />
            <h3 className="mt-4 text-xl font-semibold text-gray-800">Delete Product?</h3>
            <p className="mt-2 text-gray-600">Are you sure you want to delete "{product.name}"? This action cannot be undone.</p>
            <div className="mt-6 flex justify-center space-x-4">
                <button 
                    onClick={() => setIsDeleteModalOpen(false)} 
                    className="px-8 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
                >
                    Cancel
                </button>
                <button 
                    onClick={confirmDelete} 
                    className="px-8 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
      </Modal>
    </>
  );
};