
import React from 'react';
import { PhoneIcon } from './icons/PhoneIcon';
import { MailIcon } from './icons/MailIcon';

export const Contact: React.FC = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message! We will get back to you shortly.");
    // In a real app, you would handle form submission here.
    (e.target as HTMLFormElement).reset();
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
                <input type="text" id="contact-name" placeholder="Your Name" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green" />
              </div>
              <div>
                <label htmlFor="contact-email" className="sr-only">Email</label>
                <input type="email" id="contact-email" placeholder="Your Email" required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green" />
              </div>
              <div>
                <label htmlFor="contact-message" className="sr-only">Message</label>
                <textarea id="contact-message" placeholder="Your Message" rows={4} required className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-green"></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
