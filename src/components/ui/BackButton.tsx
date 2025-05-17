
import React from 'react';
import { ArrowLeft } from 'lucide-react';

type BackButtonProps = {
  onClick: () => void;
  label?: string;
};

const BackButton = ({ onClick, label = 'Volver' }: BackButtonProps) => {
  return (
    <button 
      onClick={onClick} 
      className="flex items-center text-vermillion hover:text-darkVermillion mb-6 transition-colors"
      type="button"
    >
      <ArrowLeft className="h-5 w-5 mr-2" />
      <span>{label}</span>
    </button>
  );
};

export default BackButton;
