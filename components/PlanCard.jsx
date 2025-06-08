import React from 'react';

export default function PlanCard({ precioMensual, costoUnicos, phrases, selections }) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <div className="md:flex md:flex-col">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu Plan</h2>

        <div className="text-lg text-gray-700 mb-6">
          <p>
            <span className="font-semibold">Precio mensual:</span> ${precioMensual.toFixed(2)}
          </p>
          <p>
            <span className="font-semibold">Costo único:</span> ${costoUnicos.toFixed(2)}
          </p>
        </div>

        <div className="text-gray-800 space-y-3">
          {phrases && phrases.map((phrase, idx) => (
            <p key={idx} className="leading-relaxed">{phrase}</p>
          ))}
        </div>

        {/* Opcional: mostrar resumen de selecciones */}
        {/* 
        <pre className="mt-4 text-xs text-gray-500">
          {JSON.stringify(selections, null, 2)}
        </pre> 
        */}
      </div>
    </div>
  );
}
