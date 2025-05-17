
import React from 'react';
import { Phone, MapPin } from 'lucide-react';

const AboutSection = () => {
  return (
    <section className="py-20 bg-white" id="nosotros">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-racing mb-4 gradient-text">Nuestra Historia</h2>
          <div className="w-24 h-1 bg-vermillion mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl font-racing mb-4 text-jetBlack">Experiencia y Confianza</h3>
            <p className="text-lg mb-6 text-gray-700">
              En <span className="font-medium">Autos Córdoba</span> nos dedicamos a ofrecer los mejores vehículos del mercado con más de 15 años de experiencia en el sector automotriz.
            </p>
            <p className="text-lg mb-6 text-gray-700">
              Nuestro compromiso es brindar la mejor asesoría para que encuentres el vehículo que se adapte perfectamente a tus necesidades y estilo de vida.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 mt-10">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-vermillion flex items-center justify-center mr-4">
                  <Phone className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Llámanos</p>
                  <p className="text-lg font-medium">+54 351 123 4567</p>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-vermillion flex items-center justify-center mr-4">
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Visítanos</p>
                  <p className="text-lg font-medium">Córdoba Capital, Argentina</p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
            <div className="rounded-lg overflow-hidden card-shadow">
              <img 
                src="https://www.elfinanciero.com.mx/resizer/V6TmldLMdhrdIw2uxv5ZHKjjmQY=/arc-photo-elfinanciero/arc2-prod/public/7KMZIEZNNJC2XJU3FVCSLQR5IE.jpg"
                alt="Concesionario Autos Córdoba"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden card-shadow">
              <img 
                src="https://images.unsplash.com/photo-1600661653561-629509216228?q=80&w=2070&auto=format&fit=crop"
                alt="Clientes satisfechos"
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="rounded-lg overflow-hidden col-span-2 card-shadow">
              <img 
                src="https://www.cosasdeautos.com.ar/wp-content/uploads/2020/12/concesionario-llaves.jpg"
                alt="Entrega de llaves"
                className="w-full h-60 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
