
import { Vehicle } from "../types/vehicle";
import { v4 as uuidv4 } from "uuid";

// Mock data for vehicles
export const mockVehicles: Vehicle[] = [
  {
    id: uuidv4(),
    type: "Autos",
    brand: "BMW",
    model: "M4 Competition",
    year: 2022,
    price: 150000,
    mileage: 15000,
    color: "Negro",
    transmission: "Automática",
    fuel: "Nafta",
    doors: 2,
    description: "BMW M4 Competition en estado impecable. Motor 3.0L Twin-Turbo con 503HP. Equipamiento completo, asientos de cuero, sistema de navegación, cámara de retroceso y mucho más.",
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2012&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1642596265371-176a7170081e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?q=80&w=2070&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: uuidv4(),
    type: "Autos",
    brand: "Mercedes-Benz",
    model: "AMG GT",
    year: 2023,
    price: 180000,
    mileage: 5000,
    color: "Gris",
    transmission: "Automática",
    fuel: "Nafta",
    doors: 2,
    description: "Mercedes-Benz AMG GT con apenas 5,000 km. Motor V8 biturbo, interior en cuero Nappa, sistema de sonido Burmester, suspensión adaptativa y más.",
    images: [
      "https://images.unsplash.com/photo-1652183430297-c8d03cff9229?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1633507104446-4c73f370e9ab?q=80&w=2072&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=2070&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: uuidv4(),
    type: "Autos",
    brand: "Audi",
    model: "RS7 Sportback",
    year: 2021,
    price: 135000,
    mileage: 25000,
    color: "Azul",
    transmission: "Automática",
    fuel: "Nafta",
    doors: 5,
    description: "Espectacular Audi RS7 Sportback con 600HP. Equipado con techo panorámico, sistema de sonido Bang & Olufsen, asientos deportivos calefaccionados y más.",
    images: [
      "https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=2069&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1542046272227-clcf89818463?q=80&w=1839&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=1931&auto=format&fit=crop"
    ],
    featured: false,
    active: true
  },
  {
    id: uuidv4(),
    type: "Autos",
    brand: "Porsche",
    model: "911 Turbo S",
    year: 2023,
    price: 220000,
    mileage: 3000,
    color: "Blanco",
    transmission: "Automática",
    fuel: "Nafta",
    doors: 2,
    description: "Porsche 911 Turbo S en estado de concesionario. Motor bóxer de 6 cilindros con 650HP, tracción integral, interior en cuero y acabados en carbono.",
    images: [
      "https://images.unsplash.com/photo-1611651338412-8403fa6e3599?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1580414057403-c5f451f30e1c?q=80&w=2073&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: uuidv4(),
    type: "Autos",
    brand: "Ferrari",
    model: "F8 Tributo",
    year: 2022,
    price: 350000,
    mileage: 2500,
    color: "Rojo",
    transmission: "Automática",
    fuel: "Nafta",
    doors: 2,
    description: "Ferrari F8 Tributo con apenas 2,500 km. Motor V8 con 720HP, 0-100 km/h en 2.9 segundos. Equipamiento completo y estado impecable.",
    images: [
      "https://images.unsplash.com/photo-1592198084033-aade902d1aae?q=80&w=1970&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1632245889029-e406adffe500?q=80&w=1780&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: uuidv4(),
    type: "Autos",
    brand: "Lamborghini",
    model: "Huracán EVO",
    year: 2021,
    price: 330000,
    mileage: 8000,
    color: "Verde",
    transmission: "Automática",
    fuel: "Nafta",
    doors: 2,
    description: "Lamborghini Huracán EVO en perfecto estado. Motor V10 de 640HP, sistema de escape deportivo, llantas forjadas y más.",
    images: [
      "https://images.unsplash.com/photo-1682100615199-503036b72ffa?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=2067&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1615889898806-e2886eb8435a?q=80&w=1935&auto=format&fit=crop"
    ],
    featured: false,
    active: true
  },
  {
    id: uuidv4(),
    type: "Motos",
    brand: "Ducati",
    model: "Panigale V4",
    year: 2023,
    price: 30000,
    mileage: 1500,
    color: "Rojo",
    transmission: "Manual",
    fuel: "Nafta",
    description: "Ducati Panigale V4 con 214HP. Estado impecable, suspensión Öhlins electrónica, frenos Brembo y electrónica de última generación.",
    images: [
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1630828966386-2b30bb9b054c?q=80&w=1932&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571646750134-8a90b93a111a?q=80&w=2070&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  },
  {
    id: uuidv4(),
    type: "Motos",
    brand: "BMW",
    model: "S1000RR",
    year: 2022,
    price: 25000,
    mileage: 3000,
    color: "Azul",
    transmission: "Manual",
    fuel: "Nafta",
    description: "BMW S1000RR con modos de conducción, control de tracción, quickshifter y más. Estado de concesionario, apenas 3,000 km.",
    images: [
      "https://images.unsplash.com/photo-1600705722908-bab2aaa23173?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631636793231-ec57dd2da8d7?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1619771914272-e3c1bafc85c0?q=80&w=2070&auto=format&fit=crop"
    ],
    featured: false,
    active: true
  },
  {
    id: uuidv4(),
    type: "Motos",
    brand: "Kawasaki",
    model: "Ninja H2",
    year: 2021,
    price: 32000,
    mileage: 4500,
    color: "Negro",
    transmission: "Manual",
    fuel: "Nafta",
    description: "Kawasaki Ninja H2 con motor sobrealimentado, 310HP. La superbike más rápida del mercado. Impecable estado.",
    images: [
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=1974&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1669819011234-71b2ff26dd09?q=80&w=1964&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1571067288779-24ddcba36d64?q=80&w=2070&auto=format&fit=crop"
    ],
    featured: true,
    active: true
  }
];

// Get all available brands
export const getAllBrands = (): string[] => {
  const brandsSet = new Set<string>();
  mockVehicles.forEach(vehicle => {
    brandsSet.add(vehicle.brand);
  });
  return Array.from(brandsSet);
};

// Get all available years
export const getAllYears = (): number[] => {
  const yearsSet = new Set<number>();
  mockVehicles.forEach(vehicle => {
    yearsSet.add(vehicle.year);
  });
  return Array.from(yearsSet).sort((a, b) => b - a); // Sort in descending order
};

// Get min and max prices
export const getPriceRange = (): { min: number; max: number } => {
  let min = Number.MAX_SAFE_INTEGER;
  let max = 0;
  
  mockVehicles.forEach(vehicle => {
    if (vehicle.price < min) min = vehicle.price;
    if (vehicle.price > max) max = vehicle.price;
  });
  
  return { min, max };
};
