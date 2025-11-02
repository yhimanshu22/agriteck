import React, { useState, useEffect } from 'react';
import { PhoneIcon } from './icons/PhoneIcon';
import { MailIcon } from './icons/MailIcon';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

export const Contact: React.FC<{ orderMessage?: string }> = ({ orderMessage }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (orderMessage) {
      setMessage(orderMessage);
    }
  }, [orderMessage]);


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please fill out all fields.');
      return;
    }
    setIsSubmitting(true);

    try {
      await addDoc(collection(db, "contacts"), {
        name,
        email,
        message,
        submittedAt: new Date(),
      });
      alert("Thank you for your message! We've received your inquiry and will get back to you shortly.");
      // Reset form
      setName('');
      setEmail('');
      setMessage('');
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Sorry, there was an error sending your message. Please try again later or contact us directly via phone or email.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-brown">Get In Touch</h2>
          <p className="mt-4 text-lg text-gray-600">We're here to help. Contact us to place an order or for any inquiries.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-brand-light p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-brand-brown mb-6">Contact Information</h3>
            <p className="text-lg text-gray-700 mb-6">
              For direct orders and faster response, please call or email us. We look forward to serving you!
            </p>
            <div className="space-y-4">
              <div className="flex items-center">
                <PhoneIcon className="w-6 h-6 text-brand-green mr-4"/>
                <a href="tel:+911234567890" className="text-lg text-gray-800 hover:text-brand-green">+91 12345 67890</a>
              </div>
              <div className="flex items-center">
                <MailIcon className="w-6 h-6 text-brand-green mr-4"/>
                <a href="mailto:orders@farmfresh.com" className="text-lg text-gray-800 hover:text-brand-green">orders@farmfresh.com</a>
              </div>
            </div>
          </div>
          <div className="bg-brand-light p-8 rounded-lg">
            <h3 className="text-2xl font-semibold text-brand-brown mb-6">Send Us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="contact-name" className="sr-only">Name</label>
                <input 
                  type="text" 
                  id="contact-name" 
                  placeholder="Your Name" 
                  required 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green" 
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Email</label>
                <input 
                  type="email" 
                  id="contact-email" 
                  placeholder="Your Email" 
                  required 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green" 
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">Message</label>
                <textarea 
                  id="contact-message" 
                  placeholder="Your Message" 
                  rows={4} 
                  required 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-4 rounded-md transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};