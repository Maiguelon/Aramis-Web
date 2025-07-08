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
  const costoUnicos = calcularCostoUnicos(nucleo, mensualConDescuento, unicos, unicosPaginas) + unicosPaginas;

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
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Hero SOLO */}
      <div className="relative mb-10 mx-auto max-w-4xl rounded-2xl overflow-hidden">
        <div className="absolute inset-0 w-full h-full bg-primary/40 backdrop-blur-sm z-0" />
        <div className="relative z-10 py-10 px-2 text-center">
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white inline-block drop-shadow-[0_2px_12px_rgba(0,0,0,0.22)] mb-4">
            Planes prearmados
            <span className="block h-2 w-32 md:w-44 bg-accent-yellow rounded-full mx-auto mt-2"></span>
          </h1>
          <p className="text-lg mt-7 max-w-2xl mx-auto text-white/90 drop-shadow-[0_2px_8px_rgba(27,42,65,0.22)]">
            Elegí el plan que mejor se adapte a tu momento.
          </p>
        </div>
      </div>

      {/* Cards */}
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

      {/* Bloque CTA final */}
      <div className="mt-14 flex justify-center">
        <div className="bg-white p-8 rounded-3xl shadow-xl max-w-md text-center border-t-4 border-accent-yellow">
          <h3 className="text-xl font-semibold mb-2 text-primary font-serif">¿Querés un plan a tu medida?</h3>
          <p className="mb-6 text-gray-600">Combiná servicios, precios y todo lo que necesitás. Armá el tuyo en segundos.</p>
          <Link href="/plan_personalizado">
            <button className="bg-accent-blue hover:bg-accent-yellow text-white hover:text-primary px-8 py-3 rounded-full font-bold text-lg shadow-lg border-2 border-accent-yellow transition-all duration-300 flex items-center gap-2 justify-center group">
              Armá tu plan personalizado
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7 ml-1 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </button>
          </Link>
        </div>
      </div>

    </div>
  );
}


