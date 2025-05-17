
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Demo car images for the slider
const sliderImages = [
  {
    url: 'https://images.unsplash.com/photo-1579116774925-3cb26560fa90?q=80&w=1887&auto=format&fit=crop',
    alt: 'Lamborghini de alto rendimiento'
  },
  {
    url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop',
    alt: 'Ferrari deportivo en carretera'
  },
  {
    url: 'https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=2067&auto=format&fit=crop',
    alt: 'Porsche clásico negro'
  },
  {
    url: 'https://images.unsplash.com/photo-1698533189336-48d8ca9fb579?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Mercedes-Benz de lujo'
  },
  {
    url: 'https://images.unsplash.com/photo-1746056700923-a75df113b894?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Porsche'
  },
  {
    url: 'https://images.unsplash.com/photo-1604940500627-d3f44d1d21c6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: 'Camaro'
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  // Auto slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev === sliderImages.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Slider images */}
      {sliderImages.map((image, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            currentSlide === index ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img 
            src={image.url} 
            alt={image.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-jetBlack/70 via-jetBlack/50 to-jetBlack/70" />
        </div>
      ))}
      
      {/* Hero content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
        <div className="animate-slide-in" style={{ animationDelay: '300ms' }}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-racing text-white mb-6 leading-none">
            EXPERIENCIA <span className="gradient-text">PREMIUM</span>
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mb-8">
            Descubre nuestra exclusiva selección de vehículos de alta gama para los amantes de la velocidad y el lujo.
          </p>
          <button 
            onClick={() => navigate('/vehiculos/autos')}
            className="btn-primary"
          >
            Explorar Vehículos
          </button>
        </div>
      </div>
      
      {/* Slider indicators */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center space-x-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index ? 'bg-vermillion w-10' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
