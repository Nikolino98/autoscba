
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";
import VehicleTable from '@/components/admin/VehicleTable';
import { TabsContent, Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useVehicles } from '@/contexts/VehicleContext';
import { supabase } from '@/integrations/supabase/client';
import { 
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Activity, BarChart4, PieChartIcon } from 'lucide-react';

// Colores para gráficos
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#FF6B6B', '#4CAF50', '#FF5252'];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { vehicles } = useVehicles();
  const [vehiclesByType, setVehiclesByType] = useState<any[]>([]);
  const [vehiclesByBrand, setVehiclesByBrand] = useState<any[]>([]);
  const [vehiclesByYear, setVehiclesByYear] = useState<any[]>([]);

  useEffect(() => {
    if (vehicles.length > 0) {
      // Procesar vehículos por tipo
      const typeCount: Record<string, number> = {};
      vehicles.forEach(vehicle => {
        if (!typeCount[vehicle.type]) {
          typeCount[vehicle.type] = 0;
        }
        typeCount[vehicle.type]++;
      });
      const typeData = Object.entries(typeCount).map(([type, count]) => ({
        name: type,
        value: count
      }));
      setVehiclesByType(typeData);

      // Procesar vehículos por marca
      const brandCount: Record<string, number> = {};
      vehicles.forEach(vehicle => {
        if (!brandCount[vehicle.brand]) {
          brandCount[vehicle.brand] = 0;
        }
        brandCount[vehicle.brand]++;
      });
      const brandData = Object.entries(brandCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 7) // Tomar las 7 marcas más frecuentes
        .map(([brand, count]) => ({
          name: brand,
          cantidad: count
        }));
      setVehiclesByBrand(brandData);

      // Procesar vehículos por año
      const yearCount: Record<string, number> = {};
      vehicles.forEach(vehicle => {
        const year = vehicle.year.toString();
        if (!yearCount[year]) {
          yearCount[year] = 0;
        }
        yearCount[year]++;
      });
      const yearData = Object.entries(yearCount)
        .sort((a, b) => Number(a[0]) - Number(b[0]))
        .map(([year, count]) => ({
          name: year,
          cantidad: count
        }));
      setVehiclesByYear(yearData);
    }
  }, [vehicles]);

  const handleLogout = () => {
    toast({
      title: "Sesión cerrada",
      description: "Has salido del panel de administración",
    });
    navigate('/admin');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-jetBlack text-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-racing">Autos Córdoba Admin</h1>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-vermillion text-white px-4 py-2 rounded hover:bg-darkVermillion transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </header>
      
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="vehicles" className="space-y-6">
          <TabsList className="grid w-full sm:w-auto grid-cols-2 sm:inline-flex">
            <TabsTrigger value="vehicles">Vehículos</TabsTrigger>
            <TabsTrigger value="stats">Estadísticas</TabsTrigger>
          </TabsList>
          
          <TabsContent value="vehicles" className="space-y-6">
            <Card>
              <CardContent className="pt-6">
                <VehicleTable />
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="stats" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Distribución de Vehículos por Tipo */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <PieChartIcon className="h-5 w-5 mr-2 text-vermillion" />
                    Distribución por Tipo
                  </CardTitle>
                  <CardDescription>
                    Cantidad de vehículos por tipo
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={vehiclesByType}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {vehiclesByType.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value} unidades`]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Vehículos por marca */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart4 className="h-5 w-5 mr-2 text-vermillion" />
                    Vehículos por Marca
                  </CardTitle>
                  <CardDescription>
                    Distribución por marcas más populares
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={vehiclesByBrand}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="cantidad" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Vehículos por año */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-vermillion" />
                    Vehículos por Año
                  </CardTitle>
                  <CardDescription>
                    Cantidad de vehículos por año de fabricación
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={vehiclesByYear}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="cantidad" stroke="#8884d8" activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
