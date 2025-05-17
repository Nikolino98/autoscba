
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Vehicle, FuelType, VehicleType, TransmissionType } from '../types/vehicle';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface VehicleFilters {
  brand: string;
  year: number | null;
  doors: number | null;
  fuel: FuelType | null;
  priceRange: { min: number; max: number };
}

interface VehicleContextType {
  vehicles: Vehicle[];
  filteredVehicles: Vehicle[];
  filters: VehicleFilters;
  availableBrands: string[];
  availableYears: number[];
  priceRange: { min: number; max: number };
  setFilters: (filters: Partial<VehicleFilters>) => void;
  resetFilters: () => void;
  getVehicleById: (id: string) => Vehicle | undefined;
  getVehiclesByType: (type: VehicleType) => Vehicle[];
  getFeaturedVehicles: () => Vehicle[];
  loading: boolean;
  refreshVehicles: () => Promise<void>;
}

const VehicleContext = createContext<VehicleContextType | undefined>(undefined);

export const VehicleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filteredVehicles, setFilteredVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  
  const [availableBrands, setAvailableBrands] = useState<string[]>([]);
  const [availableYears, setAvailableYears] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
    min: 0,
    max: 1000000
  });

  const [filters, setFilters] = useState<VehicleFilters>({
    brand: '',
    year: null,
    doors: null,
    fuel: null,
    priceRange: { min: 0, max: 1000000 }
  });

  // Función para convertir datos de Supabase al tipo Vehicle
  const convertToVehicle = (data: any): Vehicle => {
    return {
      ...data,
      type: data.type as VehicleType,
      transmission: data.transmission as TransmissionType,
      fuel: data.fuel as FuelType
    };
  };

  // Función para buscar vehículos desde Supabase
  const fetchVehicles = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('vehicles')
        .select('*');
      
      if (error) {
        throw error;
      }

      if (data) {
        // Convertimos los datos al tipo Vehicle
        const vehiclesData: Vehicle[] = data.map(convertToVehicle);
        setVehicles(vehiclesData);
        processVehicleData(vehiclesData);
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'No se pudieron cargar los vehículos',
        variant: 'destructive',
      });
      console.error('Error al cargar vehículos:', error);
    } finally {
      setLoading(false);
    }
  };

  // Función para actualizar manualmente los vehículos
  const refreshVehicles = async () => {
    await fetchVehicles();
  };

  // Cargar vehículos desde Supabase
  useEffect(() => {
    fetchVehicles();

    // Suscribirse a cambios en la tabla vehicles
    const channel = supabase
      .channel('vehicles-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'vehicles' }, () => {
        fetchVehicles(); // Recargar vehículos cuando haya cambios
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  // Procesar datos de vehículos para extraer marcas, años y rango de precios
  const processVehicleData = (data: Vehicle[]) => {
    // Extraer marcas únicas
    const brands = Array.from(new Set(data.map(v => v.brand)));
    setAvailableBrands(brands);

    // Extraer años únicos y ordenarlos de forma descendente
    const years = Array.from(new Set(data.map(v => v.year))).sort((a, b) => b - a);
    setAvailableYears(years);

    // Determinar rango de precios
    const prices = data.map(v => v.price);
    const minPrice = prices.length ? Math.min(...prices) : 0;
    const maxPrice = prices.length ? Math.max(...prices) : 1000000;
    setPriceRange({ min: minPrice, max: maxPrice });
    setFilters(prev => ({
      ...prev,
      priceRange: { min: minPrice, max: maxPrice }
    }));
  };

  // Apply filters whenever filters or vehicles change
  useEffect(() => {
    let result = [...vehicles];
    
    // Filter by brand
    if (filters.brand) {
      result = result.filter(vehicle => vehicle.brand === filters.brand);
    }
    
    // Filter by year
    if (filters.year) {
      result = result.filter(vehicle => vehicle.year === filters.year);
    }
    
    // Filter by doors (only for cars)
    if (filters.doors) {
      result = result.filter(vehicle => 
        vehicle.type === 'Autos' && vehicle.doors === filters.doors
      );
    }
    
    // Filter by fuel type
    if (filters.fuel) {
      result = result.filter(vehicle => vehicle.fuel === filters.fuel);
    }
    
    // Filter by price range
    result = result.filter(vehicle => 
      vehicle.price >= filters.priceRange.min && 
      vehicle.price <= filters.priceRange.max
    );
    
    // Only show active vehicles
    result = result.filter(vehicle => vehicle.active);
    
    setFilteredVehicles(result);
  }, [filters, vehicles]);

  const updateFilters = (newFilters: Partial<VehicleFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      brand: '',
      year: null,
      doors: null,
      fuel: null,
      priceRange: { min: priceRange.min, max: priceRange.max }
    });
  };

  const getVehicleById = (id: string) => {
    return vehicles.find(vehicle => vehicle.id === id);
  };

  const getVehiclesByType = (type: VehicleType) => {
    return vehicles.filter(vehicle => vehicle.type === type && vehicle.active);
  };

  const getFeaturedVehicles = () => {
    return vehicles.filter(vehicle => vehicle.featured && vehicle.active);
  };

  return (
    <VehicleContext.Provider
      value={{
        vehicles,
        filteredVehicles,
        filters,
        availableBrands,
        availableYears,
        priceRange,
        setFilters: updateFilters,
        resetFilters,
        getVehicleById,
        getVehiclesByType,
        getFeaturedVehicles,
        loading,
        refreshVehicles
      }}
    >
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicles = () => {
  const context = useContext(VehicleContext);
  if (context === undefined) {
    throw new Error('useVehicles must be used within a VehicleProvider');
  }
  return context;
};
