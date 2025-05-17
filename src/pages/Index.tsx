
import React from 'react';
import Navbar from '../components/Navbar';
import HeroSlider from '../components/HeroSlider';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import { ScrollToTopButton } from '../components/ScrollToTop';
import { Vehicle } from '../types/vehicle';
import { useVehicles } from '../contexts/VehicleContext';
import VehicleCard from '../components/VehicleCard';
import { Link } from 'react-router-dom';

const Index = () => {
  const { getFeaturedVehicles } = useVehicles();
  const featuredVehicles = getFeaturedVehicles().slice(0, 3);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSlider />
      
      {/* Featured Vehicles Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-racing mb-4 gradient-text">Vehículos Destacados</h2>
            <div className="w-24 h-1 bg-vermillion mx-auto mb-8"></div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Descubre nuestra selección de vehículos premium en excelente estado, listos para entrega inmediata.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredVehicles.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/vehiculos/autos" className="btn-primary">
              Ver todos los vehículos
            </Link>
          </div>
        </div>
      </section>
      
      <AboutSection />
      <Footer />
      <ScrollToTopButton />
    </div>
  );
};

export default Index;
