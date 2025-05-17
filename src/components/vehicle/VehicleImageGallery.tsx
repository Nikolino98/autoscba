
import React, { useState } from 'react';

type VehicleImageGalleryProps = {
  images: string[];
  brand: string;
  model: string;
};

const VehicleImageGallery = ({ images, brand, model }: VehicleImageGalleryProps) => {
  const [activeImage, setActiveImage] = useState(0);

  return (
    <div className="bg-jetBlack">
      <div className="relative aspect-[4/3]">
        <img 
          src={images[activeImage]} 
          alt={`${brand} ${model}`} 
          className="w-full h-full object-cover"
        />
        
        {/* Image navigation arrows */}
        {images.length > 1 && (
          <>
            <button 
              onClick={() => setActiveImage(prev => prev === 0 ? images.length - 1 : prev - 1)}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Previous image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button 
              onClick={() => setActiveImage(prev => prev === images.length - 1 ? 0 : prev + 1)}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
              aria-label="Next image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}
      </div>
      
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex overflow-x-auto p-4 space-x-2">
          {images.map((img, index) => (
            <div 
              key={index} 
              onClick={() => setActiveImage(index)}
              className={`cursor-pointer flex-shrink-0 w-20 h-16 overflow-hidden rounded ${
                activeImage === index ? 'ring-2 ring-vermillion' : 'opacity-60'
              }`}
            >
              <img 
                src={img} 
                alt={`${brand} ${model} - Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleImageGallery;
