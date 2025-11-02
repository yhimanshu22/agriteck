
import React, { useState } from 'react';
import type { Product } from '../types';
import { ProductCard } from './ProductCard';
import { useAuth } from '../auth';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !description || !price || !priceUnit || !imageUrl) {
      alert('Please fill all fields');
      return;
    }
    onAddProduct({ name, description, price: Number(price), priceUnit, imageUrl });
    onDone();
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200 mt-8">
      <h3 className="text-2xl font-semibold text-brand-brown mb-6">Add New Product</h3>
      <form onSubmit={handleSubmit} className="space-y-4 text-left">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
          <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green" />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"></textarea>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green" />
          </div>
          <div>
            <label htmlFor="priceUnit" className="block text-sm font-medium text-gray-700">Price Unit (e.g., 5kg)</label>
            <input type="text" id="priceUnit" value={priceUnit} onChange={(e) => setPriceUnit(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green" />
          </div>
        </div>
        <div>
          <label htmlFor="imageUrl" className="block text-sm font-medium text-gray-700">Image URL</label>
          <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://picsum.photos/seed/..." className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green" />
        </div>
        <div className="flex justify-end space-x-4 pt-4">
            <button type="button" onClick={onDone} className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-brand-green text-white rounded-md hover:bg-brand-green-dark transition-colors">Add Product</button>
        </div>
      </form>
    </div>
  );
};


export const Products: React.FC<ProductsProps> = ({ products, onAddProduct, onDeleteProduct, onOrder, orderConfirmation }) => {
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const { isLoggedIn } = useAuth();

  return (
    <section id="products" className="py-20 bg-white relative">
      {orderConfirmation && (
        <div className="sticky top-24 z-40 mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 mb-8 animate-fade-in-down">
            <div className="bg-brand-green-dark text-white p-4 rounded-lg shadow-lg text-center flex items-center justify-center space-x-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="font-medium">{orderConfirmation}</p>
            </div>
        </div>
      )}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-brown">Our Fresh Produce</h2>
          <p className="mt-4 text-lg text-gray-600">Handpicked and delivered with the promise of purity.</p>
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
                    onClick={() => setShowAdminPanel(!showAdminPanel)}
                    className="bg-brand-brown text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
                >
                    {showAdminPanel ? 'Close Admin Panel' : 'Add New Product'}
                </button>
                {showAdminPanel && <AddProductForm onAddProduct={onAddProduct} onDone={() => setShowAdminPanel(false)} />}
            </div>
        )}
      </div>
    </section>
  );
};