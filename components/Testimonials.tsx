
import React from 'react';
import type { Testimonial } from '../types';
import { QuoteIcon } from './icons/QuoteIcon';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export const Testimonials: React.FC<TestimonialsProps> = ({ testimonials }) => {
  return (
    <section id="testimonials" className="py-20 bg-brand-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-brand-brown">What Our Customers Say</h2>
          <p className="mt-4 text-lg text-gray-600">Building trust, one happy customer at a time.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md flex flex-col">
              <QuoteIcon className="w-10 h-10 text-brand-green mb-4" />
              <p className="text-gray-600 italic mb-6 flex-grow">"{testimonial.quote}"</p>
              <div className="mt-auto">
                <p className="font-bold text-brand-brown">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.city}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
