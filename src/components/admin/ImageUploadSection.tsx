
import React from 'react';
import { Input } from "@/components/ui/input";

interface ImageUploadSectionProps {
  images: File[];
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  existingImages: string[];
  setExistingImages: React.Dispatch<React.SetStateAction<string[]>>;
}

export const ImageUploadSection = ({ 
  images, 
  setImages, 
  existingImages, 
  setExistingImages 
}: ImageUploadSectionProps) => {

  // Función para eliminar una imagen existente
  const handleRemoveExistingImage = (index: number) => {
    setExistingImages(existingImages.filter((_, i) => i !== index));
  };

  // Función para eliminar una imagen nueva
  const handleRemoveNewImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          Imágenes del Vehículo
        </label>
        <div className="flex items-center gap-4">
          <Input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              if (e.target.files) {
                const filesArray = Array.from(e.target.files);
                setImages((prev) => [...prev, ...filesArray]);
              }
            }}
            className="max-w-md"
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Puedes seleccionar múltiples imágenes a la vez
        </p>
      </div>

      {/* Vista previa de imágenes existentes */}
      {existingImages.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Imágenes actuales</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {existingImages.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveExistingImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Vista previa de nuevas imágenes */}
      {images.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">Nuevas imágenes</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-24 object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveNewImage(index)}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
