
import React from 'react';
import { useVehicles } from '../contexts/VehicleContext';
import { Slider } from "@/components/ui/slider";
import { FuelType } from '../types/vehicle';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

const VehicleFilter = () => {
  const { 
    filters,
    setFilters,
    resetFilters,
    availableBrands,
    availableYears,
    priceRange,
  } = useVehicles();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handlePriceRangeChange = (value: number[]) => {
    setFilters({
      priceRange: {
        min: value[0],
        max: value[1]
      }
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-racing text-jetBlack">Filtros</h3>
        <button 
          onClick={resetFilters}
          className="text-sm text-vermillion hover:text-darkVermillion hover:underline transition-colors"
        >
          Limpiar filtros
        </button>
      </div>
      
      <div className="space-y-5">
        {/* Brands filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Marca</label>
          <Select
            value={filters.brand || "all-brands"}
            onValueChange={(value) => setFilters({ brand: value === "all-brands" ? "" : value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todas las marcas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-brands">Todas las marcas</SelectItem>
              {availableBrands.map((brand) => (
                <SelectItem key={brand} value={brand}>{brand}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Year filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Año</label>
          <Select
            value={filters.year?.toString() || "all-years"}
            onValueChange={(value) => setFilters({ year: value === "all-years" ? null : parseInt(value) })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todos los años" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-years">Todos los años</SelectItem>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Doors filter (only for cars) */}
        <div>
          <label className="block text-sm font-medium mb-2">Puertas</label>
          <Select
            value={filters.doors?.toString() || "all-doors"}
            onValueChange={(value) => setFilters({ doors: value === "all-doors" ? null : parseInt(value) })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-doors">Todas</SelectItem>
              <SelectItem value="2">2 puertas</SelectItem>
              <SelectItem value="3">3 puertas</SelectItem>
              <SelectItem value="4">4 puertas</SelectItem>
              <SelectItem value="5">5 puertas</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Fuel filter */}
        <div>
          <label className="block text-sm font-medium mb-2">Combustible</label>
          <Select
            value={filters.fuel || "all-fuels"}
            onValueChange={(value) => setFilters({ fuel: value === "all-fuels" ? null : value as FuelType })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-fuels">Todos</SelectItem>
              <SelectItem value="Nafta">Nafta</SelectItem>
              <SelectItem value="GNC">GNC</SelectItem>
              <SelectItem value="Ambos">Nafta y GNC</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Price range filter */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium">Rango de precio</label>
            <span className="text-xs text-gray-500">
              {formatPrice(filters.priceRange.min)} - {formatPrice(filters.priceRange.max)}
            </span>
          </div>
          <Slider
            defaultValue={[priceRange.min, priceRange.max]}
            value={[filters.priceRange.min, filters.priceRange.max]}
            min={priceRange.min}
            max={priceRange.max}
            step={1000}
            onValueChange={handlePriceRangeChange}
            className="py-4"
          />
        </div>
      </div>
    </div>
  );
};

export default VehicleFilter;
