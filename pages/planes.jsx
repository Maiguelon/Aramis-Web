import PlanCard from '../components/PlanCard';
import Link from 'next/link';
import { getPlanColor } from '../utils/getPlanColor';
import servicios from '../data/services.json'; // Importamos los precios para calcular ahorros
import {
  calcularNucleo,
  calcularUnicos,
  calcularUnicosPaginas,
  calcularMensual,
  calcularCostoUnicos
} from '../utils/PlanFunctions';

function getPlanData(selections) {
  const nucleo = calcularNucleo(selections);
  const unicos = calcularUnicos(selections);
  const unicosPaginas = calcularUnicosPaginas(selections);
  const mensual = calcularMensual(nucleo);
  
  // Costo Único limpio
  const costoUnicos = calcularCostoUnicos(nucleo, unicos) + unicosPaginas;

  return { precioMensual: mensual, costoUnicos };
}

// Función auxiliar para calcular precio de mercado (Comparativa)
function getAhorros(selections, precioAramisMensual, precioAramisUnico) {
  const mercado = servicios.mercado || {};
  
  // Calcular valor de mercado mensual
  const mercadoMensual = 
    (selections.posts * (mercado.post || 0)) +
    (selections.reels * (mercado.reel || 0)) +
    (selections.ads ? (mercado.ads || 0) : 0);

  // Calcular valor de mercado único
  const mercadoUnicos =
    (selections.brandbook ? (mercado.brandbook || 0) : 0) +
    (selections.tarjetas ? (mercado.tarjetas || 0) : 0) +
    (selections.folletos * (mercado.folletos || 0)) +
    (selections.pagina ? (mercado.pagina || 0) : 0) +
    (selections.tiendanube ? (mercado.tiendanube || 0) : 0);

  return {
    ahorroMensual: Math.max(0, mercadoMensual - precioAramisMensual),
    ahorroUnicos: Math.max(0, mercadoUnicos - precioAramisUnico)
  };
}

const planesPrearmados = [
  {
    nombre: "Pack Video (Reels)",
    descripcion: "El formato que más vende. 1 video profesional por semana para tu marca.",
    selections: { posts: 0, reels: 4, ads: false, brandbook: false, tarjetas: false, folletos: 0, pagina: false, tiendanube: false },
    extras: ["Incluye creación de guiones, luces y micrófonos para la grabación y edición profesional."]
  },
  {
    nombre: "Identidad Visual",
    descripcion: "Ideal para marcas nuevas. Todo lo visual listo para despegar.",
    selections: { posts: 0, reels: 0, ads: false, brandbook: true, tarjetas: true, folletos: 2, pagina: false, tiendanube: false },
    extras: []
  },
  {
    nombre: "Growth & Ads",
    descripcion: "Mix de contenido y publicidad para acelerar resultados reales.",
    selections: { posts: 4, reels: 2, ads: true, brandbook: false, tarjetas: false, folletos: 0, pagina: false, tiendanube: false },
    extras: [""]
  },
  {
    nombre: "Presencia Total",
    descripcion: "Tu negocio en todos lados: Web propia, Redes activas y Publicidad.",
    selections: { posts: 8, reels: 4, ads: true, brandbook: false, tarjetas: false, folletos: 0, pagina: true, tiendanube: false },
    extras: [""]
  },
];

export default function Planes() {
  return (
    <>
      {/* HERO OSCURO FULL-WIDTH */}
      <section
        className="
          relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen
          bg-primary border-b-4 border-accent-yellow
        "
      >
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white">
            Planes prearmados
            <span className="block h-2 w-32 md:w-44 bg-accent-yellow rounded-full mx-auto mt-2"></span>
          </h1>
          <p className="text-lg mt-6 max-w-2xl mx-auto text-white/90">
            Elegí el plan que mejor se adapte a tu momento.
          </p>
        </div>
      </section>

      {/* CONTENIDO CLARO FULL-WIDTH */}
      <section
        className="
          relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen
          bg-white -mb-10
        "
      >
        <div className="max-w-7xl mx-auto px-4 py-10">
          {/* Grid de cards */}
          <div className="grid md:grid-cols-2 gap-6 items-start">
            {planesPrearmados.map((plan, idx) => {
              const { precioMensual, costoUnicos } = getPlanData(plan.selections);
              
              // Calculamos el ahorro comparado con precio de mercado
              const { ahorroMensual, ahorroUnicos } = getAhorros(plan.selections, precioMensual, costoUnicos);

              const phrases = [plan.descripcion, ...plan.extras];
              const color = getPlanColor(plan.selections);

              return (
                <PlanCard
                  key={idx}
                  titulo={plan.nombre}
                  precioMensual={precioMensual}
                  costoUnicos={costoUnicos}
                  phrases={phrases}
                  color={color}
                  selections={plan.selections}
                  // Pasamos los ahorros para que salga el cartelito verde
                  ahorroMensual={ahorroMensual}
                  ahorroUnicos={ahorroUnicos}
                />
              );
            })}
          </div>

          {/* CTA final estilo INDEX, sin caja */}
          <section className="pt-20 pb-24 text-center bg-white">
            {/* Línea decorativa como en index, pero azul */}
            <div aria-hidden="true" className="h-px w-full max-w-3xl mx-auto mb-8 bg-gradient-to-r from-transparent via-accent-blue/70 to-transparent rounded-full" />

            <p className="uppercase tracking-widest text-accent-blue font-semibold mb-2">
              ¿Buscas algo más?
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-2">
              Creá tu plan
            </h2>
            <p className="text-gray-600 mb-6">
              Combiná todo lo que necesitás. Armalo en segundos.
            </p>
            <Link href="/plan_personalizado">
              <button
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-primary border-2 border-accent-yellow hover:bg-accent-yellow hover:text-primary transition-all duration-300 shadow-sm group"
                aria-label="Crear plan personalizado"
              >
                Crear plan personalizado
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 -mr-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </Link>
          </section>
        </div>
      </section>
    </>
  );
}