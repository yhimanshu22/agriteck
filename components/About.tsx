
import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-brand-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-3xl font-bold text-brand-brown mb-4">Our Story: A Bridge to Purity</h2>
            <p className="text-lg text-gray-700 mb-4">
              In the heart of the city, we realized something was missing: the genuine taste of the countryside. FarmFresh was born from a simple idea - to bridge the gap between dedicated farmers and conscious urban consumers like you.
            </p>
            <p className="text-lg text-gray-700">
              We partner directly with local farmers who practice sustainable agriculture, ensuring that every grain of rice and wheat that reaches your home is natural, nutritious, and free from harmful chemicals. By cutting out the middleman, we bring you unparalleled freshness and support the hardworking communities that feed our nation.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src="https://picsum.photos/seed/farmer/800/600" 
              alt="Farmer holding grains" 
              className="rounded-lg shadow-2xl object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
