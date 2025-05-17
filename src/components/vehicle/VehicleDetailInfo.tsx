
import React from 'react';
import { Vehicle } from '../../types/vehicle';
import { Phone } from 'lucide-react';

type VehicleDetailInfoProps = {
  vehicle: Vehicle;
  formatPrice: (price: number) => string;
  handleWhatsAppClick: () => void;
  handleCallClick: () => void;
};

const VehicleDetailInfo = ({ vehicle, formatPrice, handleWhatsAppClick, handleCallClick }: VehicleDetailInfoProps) => {
  return (
    <div className="p-6 lg:p-8">
      <h1 className="text-3xl font-racing text-jetBlack mb-2">
        {vehicle.brand} {vehicle.model}
      </h1>
      <p className="text-gray-600 mb-4">{vehicle.year}</p>
      <div className="text-2xl font-bold text-vermillion mb-6">
        {formatPrice(vehicle.price)}
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Kilometraje</p>
          <p className="font-semibold">{vehicle.mileage.toLocaleString()} km</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Transmisión</p>
          <p className="font-semibold">{vehicle.transmission}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Combustible</p>
          <p className="font-semibold">{vehicle.fuel}</p>
        </div>
        <div className="bg-gray-50 p-3 rounded">
          <p className="text-sm text-gray-500">Color</p>
          <p className="font-semibold">{vehicle.color}</p>
        </div>
        {vehicle.doors && (
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-sm text-gray-500">Puertas</p>
            <p className="font-semibold">{vehicle.doors}</p>
          </div>
        )}
      </div>
      
      <div className="mb-8">
        <h3 className="text-lg font-semibold mb-2">Descripción</h3>
        <p className="text-gray-700">{vehicle.description}</p>
      </div>
      
      <div className="space-y-4">
        <button
          onClick={handleWhatsAppClick}
          className="flex items-center justify-center w-full bg-green-500 text-white py-3 rounded hover:bg-green-600 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 mr-2">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
          </svg>
          Consultar por WhatsApp
        </button>
        
        <div className="grid grid-cols-1 gap-4">
          <button
            onClick={handleCallClick}
            className="flex items-center justify-center bg-jetBlack text-white py-3 rounded hover:bg-gray-800 transition-colors"
          >
            <Phone className="h-5 w-5 mr-2" />
            Llamar
          </button>
        </div>
      </div>
    </div>
  );
};

export default VehicleDetailInfo;
