// components/PlanDescription.jsx
import React from 'react';
import { generarFrasesPlan } from '../utils/PhrasesMaker';

const PlanDescription = ({ nucleo = 0, unicos = {}, pagina = '' }) => {
  const descripcion = generarFrasesPlan(nucleo, unicos, pagina);

  if (!descripcion) return null;

  return (
    <div className="bg-white p-4 rounded-2xl shadow-md border border-gray-200">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">Tu plan:</h2>
      <p className="text-gray-700 whitespace-pre-line leading-relaxed">{descripcion}</p>
    </div>
  );
};

export default PlanDescription;