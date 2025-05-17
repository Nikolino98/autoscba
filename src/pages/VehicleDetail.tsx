
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { ScrollToTopButton } from '../components/ScrollToTop';
import { useVehicles } from '../contexts/VehicleContext';
import LocationMap from '../components/LocationMap';
import VehicleImageGallery from '../components/vehicle/VehicleImageGallery';
import VehicleDetailInfo from '../components/vehicle/VehicleDetailInfo';
import BackButton from '../components/ui/BackButton';

const VehicleDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getVehicleById } = useVehicles();
  const [vehicle, setVehicle] = useState(id ? getVehicleById(id) : undefined);
  
  useEffect(() => {
    if (id) {
      const foundVehicle = getVehicleById(id);
      if (foundVehicle) {
        setVehicle(foundVehicle);
      } else {
        navigate('/vehiculos/autos'); // Redirect if vehicle not found
      }
    }
  }, [id, getVehicleById, navigate]);
  
  if (!vehicle) {
    return <div className="pt-20">Cargando...</div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleWhatsAppClick = () => {
    const message = `Hola, estoy interesado en el ${vehicle.brand} ${vehicle.model} (${vehicle.year}) que vi en su sitio. ¿Podría darme más información?`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/5493511234567?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCallClick = () => {
    window.location.href = 'tel:+5493511234567';
  };
  
  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-28 pb-16">
        <BackButton onClick={goBack} />
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Image Gallery */}
            <VehicleImageGallery 
              images={vehicle.images} 
              brand={vehicle.brand} 
              model={vehicle.model} 
            />
            
            {/* Vehicle Details */}
            <VehicleDetailInfo 
              vehicle={vehicle}
              formatPrice={formatPrice}
              handleWhatsAppClick={handleWhatsAppClick}
              handleCallClick={handleCallClick}
            />
          </div>
        </div>
        
        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-racing text-jetBlack mb-6">Nuestra Ubicación</h2>
          <LocationMap className="w-full" />
        </div>
      </div>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default VehicleDetail;
