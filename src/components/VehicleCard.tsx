
import React from 'react';
import { Link } from 'react-router-dom';
import { Vehicle } from '../types/vehicle';

interface VehicleCardProps {
  vehicle: Vehicle;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <Link to={`/vehiculo/${vehicle.id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden card-shadow transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={vehicle.images[0]} 
            alt={`${vehicle.brand} ${vehicle.model}`} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          {vehicle.featured && (
            <div className="absolute top-4 left-4 bg-vermillion text-white text-xs uppercase font-bold py-1 px-2 rounded">
              Destacado
            </div>
          )}
        </div>
        <div className="p-5">
          <h3 className="text-xl font-racing text-jetBlack mb-2">
            {vehicle.brand} {vehicle.model}
          </h3>
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">{vehicle.year}</span>
            <span className="text-vermillion font-bold text-lg">{formatPrice(vehicle.price)}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-600">
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-vermillion" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h8a1 1 0 001-1zm-1-9H5v1h7V7zm0 2H5v1h7V9zm0 2H5v1h7v-1zm0 2H5v1h7v-1z" />
              </svg>
              <span>{vehicle.transmission}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-vermillion" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-14a3 3 0 00-3 3v2H7a1 1 0 000 2h1v1a1 1 0 01-1 1 1 1 0 100 2h6a1 1 0 100-2H8a3 3 0 003-3V9h1a1 1 0 100-2h-1V7a1 1 0 112 0 1 1 0 102 0 3 3 0 00-3-3z" clipRule="evenodd" />
              </svg>
              <span>{vehicle.fuel}</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-vermillion" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
              </svg>
              <span>{vehicle.mileage} km</span>
            </div>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-vermillion" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z" clipRule="evenodd" />
              </svg>
              <span>{vehicle.color}</span>
            </div>
          </div>
          <div className="mt-5">
            <Link to={`/vehiculo/${vehicle.id}`} className="block w-full text-center py-2 bg-jetBlack text-white rounded transition-colors hover:bg-vermillion">
              Ver detalles
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VehicleCard;
