import PlanCard from '../components/PlanCard';
import Link from 'next/link';
import { getPlanColor } from '../utils/getPlanColor';
import {
  calcularNucleo,
  calcularUnicos,
  calcularUnicosPaginas,
  calcularMensual,
  aplicarDescuentoMensual,
  calcularCostoUnicos
} from '../utils/PlanFunctions';

function getPlanData(selections) {
  const nucleo = calcularNucleo(selections);
  const unicos = calcularUnicos(selections);
  const unicosPaginas = calcularUnicosPaginas(selections);
  const mensual = calcularMensual(nucleo);
  const mensualConDescuento = aplicarDescuentoMensual(mensual, selections);
  const costoUnicos =
    calcularCostoUnicos(nucleo, mensualConDescuento, unicos, unicosPaginas) +
    unicosPaginas;

  return { precioMensual: mensualConDescuento, costoUnicos };
}

const planesPrearmados = [
  {
    nombre: "Redes Estándar",
    descripcion: "Presencia profesional en redes con contenido y planificación.",
    selections: { posts: 6, reels: 2, historias: 12, moderacion: false, brandbook: false, tarjetas: false, folletos: 0, pagina: false, tiendanube: false },
    extras: []
  },
  {
    nombre: "Identidad Visual",
    descripcion: "Tu marca con identidad clara y piezas gráficas para comunicar.",
    selections: { posts: 0, reels: 0, historias: 0, moderacion: false, brandbook: true, tarjetas: true, folletos: 2, pagina: false, tiendanube: false },
    extras: []
  },
  {
    nombre: "Web + Redes",
    descripcion: "Tu negocio en redes y con sitio web propio. Listo para crecer.",
    selections: { posts: 6, reels: 2, historias: 0, moderacion: true, brandbook: false, tarjetas: false, folletos: 0, pagina: true, tiendanube: false },
    extras: []
  },
  {
    nombre: "Premium Total",
    descripcion: "Para marcas que buscan el máximo impacto online y visual.",
    selections: { posts: 12, reels: 4, historias: 20, moderacion: true, brandbook: true, tarjetas: false, folletos: 0, pagina: true, tiendanube: false },
    extras: []
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
