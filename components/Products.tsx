
import React, { useState, useEffect } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useAuth } from '../auth';
import { Modal } from './Modal'; // Import the Modal component

interface ProductsProps {
  products: Product[];
  onAddProduct: (product: Omit<Product, 'id'>) => void;
  onDeleteProduct: (id: number) => void;
  onOrder: (productName: string, quantity: number) => void;
  orderConfirmation: string | null;
}

const AddProductForm: React.FC<{ onAddProduct: (product: Omit<Product, 'id'>) => void, onDone: () => void }> = ({ onAddProduct, onDone }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [priceUnit, setPriceUnit] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const validate = () => {
      const newErrors: { [key: string]: string } = {};
      if (!name) newErrors.name = 'Product name is required.';
      if (!description) newErrors.description = 'Description is required.';
      if (!price) newErrors.price = 'Price is required.';
      else if (Number(price) <= 0) newErrors.price = 'Price must be positive.';
      if (!priceUnit) newErrors.priceUnit = 'Price unit is required.';
      if (!imageUrl) newErrors.imageUrl = 'Image URL is required.';
      else if (!/^https?:\/\/.+\..+/.test(imageUrl)) newErrors.imageUrl = 'Image URL is not valid.';
      setErrors(newErrors);
      setIsFormValid(Object.keys(newErrors).length === 0);
    };
    validate();
  }, [name, description, price, priceUnit, imageUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      alert('Please correct the errors before submitting.');
      return;
    }
    onAddProduct({ name, description, price: Number(price), priceUnit, imageUrl });
    onDone();
  };

  return (
    <div className="p-6 bg-green-50 rounded-xl shadow-lg">
      <h3 className="text-2xl font-semibold text-green-700 mb-6 text-center">Add New Product</h3>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={`mt-1 block w-full px-3 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
          />
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={`mt-1 block w-full px-3 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
          ></textarea>
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (₹)</label>
            <input
              type="number"
              id="price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${errors.price ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
            />
            {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
          </div>
          <div>
            <label htmlFor="priceUnit" className="block text-sm font-medium text-gray-700">Price Unit (e.g., 5kg)</label>
            <input
              type="text"
              id="priceUnit"
              value={priceUnit}
              onChange={(e) => setPriceUnit(e.target.value)}
              className={`mt-1 block w-full px-3 py-2 border ${errors.priceUnit ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
            />
            {errors.priceUnit && <p className="text-red-500 text-xs mt-1">{errors.priceUnit}</p>}
          </div>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://picsum.photos/seed/..."
            className={`mt-1 block w-full px-3 py-2 border ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500`}
          />
          {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
        </div>
        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={onDone}
            className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!isFormValid}
            className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};


export const Products: React.FC<ProductsProps> = ({ products, onAddProduct, onDeleteProduct, onOrder, orderConfirmation }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <section
      id="products"
      className="py-20 bg-gradient-to-br from-green-100 via-yellow-50 to-green-200 relative"
    >
      {orderConfirmation && (
        <div className="sticky top-24 z-40 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 mb-8 animate-fade-in-down">
          <div className="bg-green-600 text-white p-4 rounded-lg shadow-lg text-center flex items-center justify-center space-x-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="font-medium">{orderConfirmation}</p>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-green-800">Our Fresh Produce</h2>
          <p className="mt-4 text-lg text-gray-700">Handpicked and delivered with the promise of purity.</p>
        </div>

        {products.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onDelete={onDeleteProduct}
                onOrder={onOrder}
                isLoggedIn={isLoggedIn}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700">No Products Found</h3>
            <p className="mt-2 text-gray-500">Try adjusting your search or check back later.</p>
          </div>
        )}

        {isLoggedIn && (
          <div className="text-center mt-16">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="bg-green-600 text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
            >
              Add New Product
            </button>
          </div>
        )}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <AddProductForm 
          onAddProduct={onAddProduct} 
          onDone={() => setIsAddModalOpen(false)} 
        />
      </Modal>
    </section>
  );
};
