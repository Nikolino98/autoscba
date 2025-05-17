
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Vehicle, VehicleType, TransmissionType, FuelType } from "@/types/vehicle";
import { useToast } from "@/hooks/use-toast";
import { v4 as uuidv4 } from "uuid";
import { useVehicles } from "@/contexts/VehicleContext";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { VehicleFormFields } from "./VehicleFormFields";
import { ImageUploadSection } from "./ImageUploadSection";

// Schema para validación de formulario
const vehicleSchema = z.object({
  type: z.enum(["Autos", "Motos"]),
  brand: z.string().min(1, "La marca es requerida"),
  model: z.string().min(1, "El modelo es requerido"),
  year: z.coerce.number().int().min(1900).max(new Date().getFullYear() + 1),
  price: z.coerce.number().positive(),
  mileage: z.coerce.number().nonnegative(),
  color: z.string().min(1, "El color es requerido"),
  transmission: z.enum(["Manual", "Automática"]),
  fuel: z.enum(["Nafta", "GNC", "Ambos"]),
  doors: z.coerce.number().int().min(1).max(5).optional(),
  description: z.string().min(10, "La descripción debe tener al menos 10 caracteres"),
  featured: z.boolean().default(false),
  active: z.boolean().default(true),
});

// Imágenes por defecto para cuando no se selecciona ninguna
const DEFAULT_IMAGES = [
  "https://images.unsplash.com/photo-1583121274602-3e2820c69888?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2664&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=1974&auto=format&fit=crop",
];

interface VehicleFormProps {
  vehicle?: Vehicle;
  onSuccess: () => void;
}

export default function VehicleForm({ vehicle, onSuccess }: VehicleFormProps) {
  const { toast } = useToast();
  const { refreshVehicles } = useVehicles();
  const [images, setImages] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [existingImages, setExistingImages] = useState<string[]>(
    vehicle?.images || []
  );

  // Configuración del formulario con valores por defecto
  const form = useForm<z.infer<typeof vehicleSchema>>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: vehicle ? {
      ...vehicle,
      doors: vehicle.doors || undefined
    } : {
      type: "Autos",
      brand: "",
      model: "",
      year: new Date().getFullYear(),
      price: 0,
      mileage: 0,
      color: "",
      transmission: "Manual",
      fuel: "Nafta",
      doors: undefined,
      description: "",
      featured: false,
      active: true,
    },
  });

  // Función para subir imágenes
  const uploadImages = async () => {
    // Si no hay imágenes seleccionadas y no hay existentes, usamos las imágenes por defecto
    if (images.length === 0 && existingImages.length === 0) {
      return { data: DEFAULT_IMAGES };
    }

    // Si no hay nuevas imágenes que subir, mantener las existentes
    if (images.length === 0) {
      return { data: existingImages };
    }

    setUploading(true);

    try {
      const uploadedUrls: string[] = [...existingImages];

      // Subir cada imagen y agregar su URL al array
      for (const image of images) {
        const fileName = `${uuidv4()}-${image.name}`;
        const { data, error } = await supabase.storage
          .from("vehicle-images")
          .upload(fileName, image);

        if (error) {
          throw new Error(`Error al subir imagen: ${error.message}`);
        }

        // Generar URL pública de la imagen
        const { data: publicUrl } = supabase.storage
          .from("vehicle-images")
          .getPublicUrl(data.path);

        uploadedUrls.push(publicUrl.publicUrl);
      }

      return { data: uploadedUrls };
    } catch (error) {
      return { error: (error as Error).message };
    } finally {
      setUploading(false);
    }
  };

  // Función para manejar el envío del formulario
  const onSubmit = async (values: z.infer<typeof vehicleSchema>) => {
    // Subir imágenes
    const imageResult = await uploadImages();
    if (imageResult.error) {
      toast({
        title: "Error",
        description: imageResult.error,
        variant: "destructive",
      });
      return;
    }

    try {
      // Construir todos los campos requeridos para la tabla de vehículos
      const vehicleData = {
        id: vehicle?.id || uuidv4(),
        type: values.type,
        brand: values.brand,
        model: values.model,
        year: values.year,
        price: values.price,
        mileage: values.mileage,
        color: values.color,
        transmission: values.transmission,
        fuel: values.fuel,
        doors: values.doors || null,
        description: values.description,
        images: imageResult.data || [],
        featured: values.featured,
        active: values.active,
      };

      if (vehicle) {
        // Actualizar vehículo existente
        const { error } = await supabase
          .from("vehicles")
          .update(vehicleData)
          .eq("id", vehicle.id);

        if (error) throw error;

        toast({
          title: "Éxito",
          description: "Vehículo actualizado correctamente",
        });
      } else {
        // Crear nuevo vehículo
        const { error } = await supabase
          .from("vehicles")
          .insert(vehicleData);

        if (error) throw error;

        toast({
          title: "Éxito",
          description: "Vehículo añadido correctamente",
        });
      }

      // Forzar actualización de los vehículos
      await refreshVehicles();

      // Limpiar el formulario
      form.reset();
      setImages([]);
      setExistingImages([]);
      onSuccess();
    } catch (error) {
      toast({
        title: "Error",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  // Renderización condicional para mostrar el campo de puertas solo para Autos
  const showDoors = form.watch("type") === "Autos";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-6">
        <VehicleFormFields form={form} showDoors={showDoors} />
        
        <ImageUploadSection 
          images={images}
          setImages={setImages}
          existingImages={existingImages}
          setExistingImages={setExistingImages}
        />

        <div className="pt-4 flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={onSuccess}>
            Cancelar
          </Button>
          <Button type="submit" disabled={uploading}>
            {uploading ? "Subiendo..." : vehicle ? "Actualizar Vehículo" : "Crear Vehículo"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
