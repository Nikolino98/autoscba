
import React from 'react';

type LocationMapProps = {
  className?: string;
}

const LocationMap = ({ className = '' }: LocationMapProps) => {
  return (
    <div className={`relative rounded-lg overflow-hidden shadow-lg ${className}`}>
      <iframe 
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d108977.46589433907!2d-64.26694645000001!3d-31.416839699999996!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432985f478f5b69%3A0xb0a24f9a5366b092!2sC%C3%B3rdoba%2C%20C%C3%B3rdoba%20Province%2C%20Argentina!5e0!3m2!1sen!2sus!4v1715877042763!5m2!1sen!2sus"
        width="100%" 
        height="300" 
        style={{ border: 0 }} 
        allowFullScreen 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Ubicación de la concesionaria"
        aria-label="Ubicación de la concesionaria"
      />
    </div>
  );
};

export default LocationMap;
