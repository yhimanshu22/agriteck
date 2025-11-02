
import React, { useState, useEffect } from 'react';
import { ChevronLeftIcon } from './icons/ChevronLeftIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

const slides = [
  {
    imageUrl: 'https://picsum.photos/seed/farm/1920/1080',
    alt: 'Lush green farm field at sunrise',
  },
  {
    imageUrl: 'https://picsum.photos/seed/wheatfield/1920/1080',
    alt: 'Golden wheat field under a blue sky',
  },
  {
    imageUrl: 'https://picsum.photos/seed/ricepaddy/1920/1080',
    alt: 'Terraced rice paddies in a vibrant green landscape',
  },
  {
    imageUrl: 'https://picsum.photos/seed/farmerwork/1920/1080',
    alt: 'Farmer tending to crops in a field',
  },
];

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const prevSlide = () => {
    const isFirstSlide = currentSlide === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentSlide - 1;
    setCurrentSlide(newIndex);
  };

  const nextSlide = () => {
    const isLastSlide = currentSlide === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentSlide + 1;
    setCurrentSlide(newIndex);
  };
  
  const goToSlide = (slideIndex: number) => {
    setCurrentSlide(slideIndex);
  }

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    return () => clearInterval(slideInterval);
  }, [currentSlide]);

  return (
    <section id="home" className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white overflow-hidden">
      {/* Carousel Images */}
      {slides.map((slide, index) => (
        <img
          key={index}
          src={slide.imageUrl}
          alt={slide.alt}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>

      {/* Content */}
      <div className="relative z-20 text-center px-4">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4" style={{textShadow: '2px 2px 8px rgba(0,0,0,0.6)'}}>
          Directly from Farm to Home
        </h1>
        <p className="text-lg md:text-2xl max-w-3xl mx-auto text-gray-200" style={{textShadow: '1px 1px 4px rgba(0,0,0,0.6)'}}>
          Experience the authentic taste of freshness. Pure, natural, and delivered with care.
        </p>
        <a 
          href="#products"
          className="mt-8 inline-block bg-brand-green hover:bg-brand-green-dark text-white font-bold py-3 px-8 rounded-full text-lg transition-transform transform hover:scale-105 duration-300 shadow-lg"
        >
          Explore Our Products
        </a>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute z-20 top-1/2 -translate-y-1/2 w-full flex justify-between px-4 sm:px-8">
        <button onClick={prevSlide} aria-label="Previous slide" className="bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
          <ChevronLeftIcon className="h-6 w-6" />
        </button>
        <button onClick={nextSlide} aria-label="Next slide" className="bg-black/30 hover:bg-black/50 text-white p-3 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-white/50">
          <ChevronRightIcon className="h-6 w-6" />
        </button>
      </div>

      {/* Dot Indicators */}
      <div className="absolute z-20 bottom-8 left-1/2 -translate-x-1/2 flex space-x-3">
        {slides.map((_, slideIndex) => (
          <button 
            key={slideIndex}
            onClick={() => goToSlide(slideIndex)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === slideIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Go to slide ${slideIndex + 1}`}
          ></button>
        ))}
      </div>
    </section>
  );
};
