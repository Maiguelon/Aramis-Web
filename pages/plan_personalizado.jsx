'use client';
import React, { useState } from 'react';
import PriceSelectorForm from '../components/PriceSelector';
import PlanCardWrapper from '../components/PlanCardWrapper';

export default function PlanPersonalizado() {
  const [selections, setSelections] = useState({});

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-8 text-center md:text-left">Armá tu plan personalizado</h1>

      <div className="flex flex-col md:flex-row md:space-x-8 space-y-8 md:space-y-0">
        {/* Formulario a la izquierda */}
        <div className="md:w-1/2">
          <PriceSelectorForm onChange={setSelections} />
        </div>

        {/* Tarjeta a la derecha */}
        <div className="md:w-1/2">
          <PlanCardWrapper selections={selections} />
        </div>
      </div>
    </div>
  );
}


