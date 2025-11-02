
import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Products } from './components/Products';
import { Testimonials } from './components/Testimonials';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import type { Product, Testimonial } from './types';
import { useAuth } from './auth';

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Premium Basmati Rice',
      description: 'Long-grain aromatic rice, perfect for biryani and pulao. Aged for 12 months for extra flavor.',
      price: 15,
      priceUnit: '5kg',
      imageUrl: 'https://picsum.photos/seed/rice/600/400',
    },
    {
      id: 2,
      name: 'Organic Whole Wheat',
      description: 'Stone-ground whole wheat grain, rich in fiber and nutrients. Ideal for healthy rotis and bread.',
      price: 10,
      priceUnit: '5kg',
      imageUrl: 'https://picsum.photos/seed/wheat/600/400',
    },
  ]);

  const [testimonials] = useState<Testimonial[]>([
    {
      id: 1,
      quote: "The quality of the rice is outstanding. You can taste the freshness in every bite. It's so much better than what I find in local supermarkets.",
      name: 'Ananya Sharma',
      city: 'Mumbai',
    },
    {
      id: 2,
      quote: "Finally, authentic farm-fresh wheat delivered to my doorstep. My family loves the chapatis made from this flour. Highly recommended!",
      name: 'Rajesh Kumar',
      city: 'Delhi',
    },
     {
      id: 3,
      quote: "I was hesitant to order online, but the process was smooth and the products are top-notch. It feels good to support farmers directly.",
      name: 'Priya Singh',
      city: 'Bangalore',
    },
  ]);

  const { isLoggedIn } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [orderMessage, setOrderMessage] = useState('');
  const [orderConfirmation, setOrderConfirmation] = useState<string | null>(null);

  const handleAddProduct = (product: Omit<Product, 'id'>) => {
    const newProduct: Product = {
      ...product,
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
    };
    setProducts(prevProducts => [...prevProducts, newProduct]);
  };
  
  const handleDeleteProduct = (id: number) => {
    if (!isLoggedIn) return;
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prevProducts => prevProducts.filter(p => p.id !== id));
    }
  };

  const handleOrder = (productName: string, quantity: number) => {
    if (quantity > 0) {
      setOrderMessage(`I would like to order ${quantity}kg of ${productName}. Please provide further details.`);
      setOrderConfirmation(`Thank you! Added ${quantity}kg of ${productName} to your inquiry. Scrolling to contact form...`);
      
      setTimeout(() => {
        setOrderConfirmation(null);
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
      }, 3000);
    } else {
      alert('Please enter a valid quantity.');
    }
  };

  const filteredProducts = products.filter(
    product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white text-gray-800 font-sans">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      <main>
        <Hero />
        <About />
        <Products 
          products={filteredProducts} 
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          onOrder={handleOrder}
          orderConfirmation={orderConfirmation}
        />
        <Testimonials testimonials={testimonials} />
        <Contact orderMessage={orderMessage} />
      </main>
      <Footer />
    </div>
  );
};

export default App;