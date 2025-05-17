
export type FuelType = 'Nafta' | 'GNC' | 'Ambos';
export type TransmissionType = 'Manual' | 'Automática';
export type VehicleType = 'Autos' | 'Motos';

export interface Vehicle {
  id: string;
  type: VehicleType;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  color: string;
  transmission: TransmissionType;
  fuel: FuelType;
  doors?: number; // Optional, for cars only
  description: string;
  images: string[];
  featured: boolean;
  active: boolean;
}

// Extendemos los tipos para agregar algunos helpers adicionales para el componente Badge
export type BadgeVariantType = 'default' | 'secondary' | 'outline' | 'destructive' | 'success';
