
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Change navbar styling when scroll position changes
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-jetBlack/90 backdrop-blur-md py-2 shadow-lg' : 'bg-jetBlack py-4'
    }`}>
      <div className="container mx-auto flex justify-between items-center px-4 md:px-6">
        <Link to="/" className="text-white font-racing text-2xl sm:text-3xl tracking-wider">
          Autos <span className="text-vermillion">Córdoba</span>
        </Link>
        
        <div className="hidden md:flex space-x-8 items-center">
          <Link to="/" className="navbar-link">
            Inicio
          </Link>
          
          <DropdownMenu>
            <DropdownMenuTrigger className="navbar-link flex items-center">
              <span>Vehículos</span>
              <ChevronDown className="ml-1 h-4 w-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-jetBlack border border-vermillion/20">
              <DropdownMenuItem className="hover:bg-vermillion/10">
                <Link to="/vehiculos/autos" className="w-full py-1 text-white hover:text-vermillion">
                  Autos
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-vermillion/10">
                <Link to="/vehiculos/motos" className="w-full py-1 text-white hover:text-vermillion">
                  Motos
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to="/contacto" className="navbar-link">
            Contacto
          </Link>
          
          <Link to="/admin" className="navbar-link">
            ADMIN
          </Link>
        </div>
        
        {/* Mobile menu using Sheet from shadcn */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <button className="text-white p-2 focus:outline-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </SheetTrigger>
            <SheetContent className="bg-jetBlack text-white border-l border-vermillion/20">
              <div className="py-6 flex flex-col space-y-6">
                <Link to="/" className="text-white hover:text-vermillion text-xl">
                  Inicio
                </Link>
                
                <div className="space-y-3">
                  <p className="text-white text-lg mb-2">Vehículos</p>
                  <Link to="/vehiculos/autos" className="text-white/80 hover:text-vermillion block pl-4">
                    Autos
                  </Link>
                  <Link to="/vehiculos/motos" className="text-white/80 hover:text-vermillion block pl-4">
                    Motos
                  </Link>
                </div>
                
                <Link to="/contacto" className="text-white hover:text-vermillion text-xl">
                  Contacto
                </Link>
                
                <Link to="/admin" className="text-white hover:text-vermillion text-xl">
                  ADMIN
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
