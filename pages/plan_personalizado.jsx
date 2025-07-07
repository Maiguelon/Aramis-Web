// pages/plan_personalizado.jsx
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PriceSelectorForm from '../components/PriceSelector';
import PlanCardWrapper from '../components/PlanCardWrapper';

export default function PlanPersonalizado() {
  const [selections, setSelections] = useState({});

  // Chequeo de flags para animaciones
  const tieneMensual =
    selections.posts > 0 ||
    selections.reels > 0 ||
    selections.historias > 0 ||
    selections.moderacion;
  const tieneUnico =
    selections.brandbook ||
    selections.tarjetas ||
    (selections.folletos > 0);
  const tieneWeb = selections.pagina || selections.tiendanube;

  const animKey = `${tieneMensual ? 1 : 0}-${tieneUnico ? 1 : 0}-${tieneWeb ? 1 : 0}`;

  return (
    // Fondo con gradiente institucional
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-primary via-bg-light to-accent-blue/10 py-10">
      <div className="w-full max-w-6xl mx-auto p-2">
        {/* Bloque principal */}
        <div className="rounded-3xl bg-white/90 shadow-2xl border border-bg-light backdrop-blur-sm p-4 md:p-10 flex flex-col md:flex-row gap-8">
          {/* Formulario a la izquierda */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-6 text-center md:text-left drop-shadow-sm">
              Armá tu plan personalizado
            </h1>
            <PriceSelectorForm onChange={setSelections} />
          </div>

          {/* Card del plan a la derecha, con animación */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={animKey}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.35, type: "spring" }}
                className="h-full"
              >
                <PlanCardWrapper selections={selections} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}




