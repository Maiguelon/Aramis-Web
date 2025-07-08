import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PriceSelectorForm from '../components/PriceSelector';
import PlanCardWrapper from '../components/PlanCardWrapper';

export default function PlanPersonalizado() {
  const [selections, setSelections] = useState({});

  // Chequeo de flags para animaciones (opcional)
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
    <div className="min-h-[calc(100vh-64px)] w-full flex items-center justify-center">
    <div className="w-full max-w-6xl mx-auto p-2 md:py-8">
      
      {/* Título y subfrase alineados a la izquierda en desktop */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-serif font-bold text-white text-left mb-2">
          Armá tu plan personalizado
        </h1>
        <p className="text-lg text-white/90 text-left md:text-base">
          Tus necesidades, tu plan.
        </p>

          {/* Bloque principal: Form + Card */}
        </div>



        {/* Bloque principal */}
        <div className="
      rounded-3xl 
      bg-white/90 
      shadow-2xl 
      border border-bg-light 
      backdrop-blur-sm 
      p-4 md:p-10 
      flex flex-col md:flex-row gap-8 
      md:items-stretch
    ">
          {/* Formulario a la izquierda, ahora sin el título */}
          <div className="md:w-1/2 flex flex-col justify-center h-full">
            <PriceSelectorForm onChange={setSelections} />
          </div>

          {/* Card del plan a la derecha */}
          <div className="md:w-1/2 flex flex-col justify-center h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={animKey}
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.35, type: "spring" }}
                className="h-full flex flex-col"
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





