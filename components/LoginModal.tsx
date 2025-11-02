import React, { useState } from 'react';
import { useAuth } from '../auth';
import { XIcon } from './icons/XIcon';

interface LoginModalProps {
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(password);
    if (success) {
      onClose();
    } else {
      setError('Invalid password.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100]" aria-modal="true" role="dialog" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full m-4 relative" onClick={e => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600" aria-label="Close modal">
          <XIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-brand-brown mb-4 text-center">Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <p className="text-gray-600 mb-4 text-center text-sm">Please enter the password to manage products.</p>
          <div className="mt-4">
            <label htmlFor="password" className="sr-only">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setError(''); }}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand-green focus:border-brand-green"
              required
              autoFocus
            />
          </div>
          {error && <p className="text-red-500 text-sm mt-2 text-center">{error}</p>}
          <div className="mt-6">
            <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-2 px-4 rounded-md transition-colors duration-300">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
