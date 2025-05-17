
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Table, TableHeader, TableBody, TableRow, 
  TableHead, TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Plus, Car } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Vehicle } from "@/types/vehicle";
import { useToast } from "@/hooks/use-toast";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import VehicleForm from "./VehicleForm";

export default function VehicleTable() {
  const { toast } = useToast();
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editVehicle, setEditVehicle] = useState<Vehicle | null>(null);

  // Fetch vehicles from Supabase
  const { data: vehicles, isLoading, error, refetch } = useQuery({
    queryKey: ['admin-vehicles'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('vehicles')
        .select('*')
        .order('created_at', { ascending: false });
        
      if (error) {
        throw new Error(error.message);
      }
      return data as Vehicle[];
    }
  });

  // Handle vehicle deletion
  const handleDelete = async (id: string) => {
    if (confirm('¿Estás seguro de que quieres eliminar este vehículo?')) {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);
        
      if (error) {
        toast({
          title: "Error",
          description: "No se pudo eliminar el vehículo: " + error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Éxito",
          description: "Vehículo eliminado correctamente",
        });
        refetch();
      }
    }
  };

  // Format price with Argentine peso symbol
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };

  if (isLoading) return <div className="text-center py-4">Cargando vehículos...</div>;
  
  if (error) return (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
      Error al cargar vehículos: {(error as Error).message}
    </div>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-racing">Gestión de Vehículos</h2>
        
        <Sheet open={isAddOpen} onOpenChange={setIsAddOpen}>
          <SheetTrigger asChild>
            <Button>
              <Plus className="mr-2" />
              Nuevo Vehículo
            </Button>
          </SheetTrigger>
          <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
            <SheetHeader>
              <SheetTitle>Añadir Vehículo</SheetTitle>
            </SheetHeader>
            <VehicleForm 
              onSuccess={() => {
                setIsAddOpen(false);
                refetch();
              }} 
            />
          </SheetContent>
        </Sheet>
      </div>

      {vehicles && vehicles.length > 0 ? (
        <>
          <div className="mb-4 text-sm text-gray-500">
            Mostrando {vehicles.length} vehículos
          </div>
          <div className="border rounded-md overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Marca/Modelo</TableHead>
                  <TableHead>Año</TableHead>
                  <TableHead>Precio</TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead>Destacado</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell>
                      <Badge variant={vehicle.type === 'Autos' ? 'default' : 'outline'}>
                        {vehicle.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      {vehicle.brand} {vehicle.model}
                    </TableCell>
                    <TableCell>{vehicle.year}</TableCell>
                    <TableCell>{formatPrice(vehicle.price)}</TableCell>
                    <TableCell>
                      <Badge variant={vehicle.active ? 'success' : 'destructive'}>
                        {vehicle.active ? 'Activo' : 'Inactivo'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {vehicle.featured ? (
                        <Badge variant="secondary">Destacado</Badge>
                      ) : (
                        '—'
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <Sheet>
                        <SheetTrigger asChild>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mr-2"
                            onClick={() => setEditVehicle(vehicle)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                        </SheetTrigger>
                        <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
                          <SheetHeader>
                            <SheetTitle>Editar Vehículo</SheetTitle>
                          </SheetHeader>
                          {editVehicle && (
                            <VehicleForm 
                              vehicle={editVehicle}
                              onSuccess={() => {
                                setEditVehicle(null);
                                refetch();
                              }} 
                            />
                          )}
                        </SheetContent>
                      </Sheet>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDelete(vehicle.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <div className="text-center py-16 border rounded-md bg-gray-50">
          <Car className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-racing mb-2">No hay vehículos</h3>
          <p className="text-gray-500 mb-6">
            Añade tu primer vehículo para comenzar
          </p>
          <Button 
            onClick={() => setIsAddOpen(true)}
            variant="outline"
          >
            <Plus className="mr-2 h-4 w-4" />
            Añadir Vehículo
          </Button>
        </div>
      )}
    </div>
  );
}
