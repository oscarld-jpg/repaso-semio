import React from 'react';
import { Lightbulb, Skull } from 'lucide-react';

interface AlertBoxProps {
  type: 'pearl' | 'error';
  text: string;
}

export const AlertBox: React.FC<AlertBoxProps> = ({ type, text }) => {
  const isPearl = type === 'pearl';
  
  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg border-l-4 shadow-sm ${
      isPearl ? 'bg-teal-50 border-teal-500' : 'bg-red-50 border-red-500'
    }`}>
      <div className={`mt-1 shrink-0 ${isPearl ? 'text-teal-600' : 'text-red-600'}`}>
        {isPearl ? <Lightbulb size={24} /> : <Skull size={24} />}
      </div>
      <div>
        <h4 className={`font-bold text-sm uppercase mb-1 ${isPearl ? 'text-teal-800' : 'text-red-800'}`}>
          {isPearl ? 'Perla Clínica' : 'Error Mortal'}
        </h4>
        <p className={`text-sm ${isPearl ? 'text-teal-900' : 'text-red-900'}`}>
          {text}
        </p>
      </div>
    </div>
  );
};