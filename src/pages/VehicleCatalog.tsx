
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import VehicleCard from '../components/VehicleCard';
import VehicleFilter from '../components/VehicleFilter';
import { ScrollToTopButton } from '../components/ScrollToTop';
import { useVehicles } from '../contexts/VehicleContext';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const VehicleCatalog = () => {
  const { type } = useParams<{ type: string }>();
  const { filteredVehicles, loading, refreshVehicles } = useVehicles();
  const { toast } = useToast();
  const [displayVehicles, setDisplayVehicles] = useState(filteredVehicles);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    if (type === 'autos' || type === 'motos') {
      const vehicleType = type === 'autos' ? 'Autos' : 'Motos';
      setDisplayVehicles(
        filteredVehicles.filter(v => v.type === vehicleType)
      );
    } else {
      setDisplayVehicles(filteredVehicles);
    }
  }, [type, filteredVehicles]);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshVehicles();
      toast({
        title: "Actualizado",
        description: "Los vehículos se han actualizado correctamente",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron actualizar los vehículos",
        variant: "destructive",
      });
    } finally {
      setTimeout(() => setIsRefreshing(false), 1000);
    }
  };

  const pageTitle = type === 'autos' 
    ? 'Autos Premium' 
    : type === 'motos' 
      ? 'Motos de Alta Gama' 
      : 'Todos los Vehículos';

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="pt-24 pb-16 bg-jetBlack relative">
        <div className="absolute inset-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?q=80&w=2070&auto=format&fit=crop"
            alt="Vehículos background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="text-4xl md:text-5xl font-racing mb-4 text-white text-center">{pageTitle}</h1>
          <p className="text-lg text-center text-white/80 max-w-2xl mx-auto">
            Explore nuestra selección de vehículos y encuentre el que mejor se adapte a sus necesidades.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-1/4">
            <div className="sticky top-24">
              <VehicleFilter />
              <div className="mt-4">
                <Button onClick={handleRefresh} variant="outline" className="w-full" disabled={isRefreshing}>
                  <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                  Actualizar vehículos
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-3/4">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-12 h-12 border-4 border-vermillion border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-gray-600">Cargando vehículos...</p>
              </div>
            ) : displayVehicles.length > 0 ? (
              <>
                <p className="mb-6 text-gray-600">
                  Mostrando {displayVehicles.length} vehículos
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                  {displayVehicles.map(vehicle => (
                    <VehicleCard key={vehicle.id} vehicle={vehicle} />
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white p-8 rounded-lg text-center shadow">
                <h3 className="text-2xl font-racing mb-2">No se encontraron vehículos</h3>
                <p className="text-gray-600 mb-4">No hay vehículos que coincidan con los filtros seleccionados.</p>
                <button 
                  onClick={() => window.location.reload()}
                  className="btn-primary"
                >
                  Reiniciar filtros
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default VehicleCatalog;
