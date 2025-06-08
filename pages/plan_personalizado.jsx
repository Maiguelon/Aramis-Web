'use client';
import React, { useState } from 'react';
import PriceSelector from '../components/PriceSelector';
import PlanCardWrapper from '../components/PlanCardWrapper';

export default function PlanesPage() {
  const [selections, setSelections] = useState({
    posts: 0,
    reels: 0,
    historias: 0,
    moderacion: 0,
    brandbook: 0,
    tarjetas: 0,
    folletos: 0,
    pagina: 0,
    tiendanube: 0,
  });

  return (
    <main className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Armá tu plan personalizado</h1>
      <PriceSelector onChange={setSelections} />
      <div className="mt-8">
        <PlanCardWrapper selections={selections} />
      </div>
    </main>
  );
}

