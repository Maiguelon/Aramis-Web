import React from 'react';

export default function PlanCard({ precioMensual, costoUnicos, phrases, selections }) {
  const mostrarContenido = precioMensual > 0 || costoUnicos > 0 || (phrases && phrases.length > 0);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-6">
      <div className="md:flex md:flex-col">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Tu Plan</h2>

        {mostrarContenido ? (
          <>
            <div className="text-lg text-gray-700 mb-6">
              {precioMensual > 0 && (
                <p>
                  <span className="font-semibold">Precio mensual:</span> ${precioMensual.toFixed(2)}
                </p>
              )}
              {costoUnicos > 0 && (
                <p>
                  <span className="font-semibold">Costo único:</span> ${costoUnicos.toFixed(2)}
                </p>
              )}
            </div>

            <div className="text-gray-800 space-y-3">
              {phrases.map((phrase, idx) => (
                <p key={idx} className="leading-relaxed">{phrase}</p>
              ))}
            </div>
          </>
        ) : (
          <p className="text-gray-500 italic">Todavía no seleccionaste elementos para tu plan.</p>
        )}
      </div>
    </div>
  );
}
