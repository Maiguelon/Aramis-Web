// pages/planes.jsx
import PlanCard from '../components/PlanCard';
import Link from 'next/link';
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
    extras: [
      "Optimización de biografía y enlaces",
      "Planificación y programación de contenido",
      "Análisis de estadísticas trimestral",
      "Portadas de historias destacadas"
    ]
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
      <h1 className="text-2xl md:text-4xl font-bold mb-2 text-center">Planes prearmados</h1>
      <p className="text-lg text-gray-600 mb-8 text-center max-w-2xl mx-auto">
        Elegí el plan que mejor se adapte a tu momento. Todos los precios y combinaciones pueden personalizarse según tu necesidad.
      </p>
      <div className="grid md:grid-cols-2 gap-6">
        {planesPrearmados.map((plan, idx) => {
          const { precioMensual, costoUnicos } = getPlanData(plan.selections);
          const phrases = [plan.descripcion, ...plan.extras];
          return (
            <PlanCard
              key={idx}
              titulo={plan.nombre}
              precioMensual={precioMensual}
              costoUnicos={costoUnicos}
              phrases={phrases}
              selections={plan.selections}
            />
          );
        })}
      </div>
      {/* Botón final */}
      <div className="mt-10 flex justify-center">
        <div className="bg-white p-6 rounded-xl shadow-md max-w-md text-center">
          <h3 className="text-lg font-semibold mb-2">¿Querés un plan a tu medida?</h3>
          <p className="mb-4">Combiná servicios, precios y todo lo que necesitás. Armá el tuyo en segundos.</p>
          <Link href="/plan_personalizado">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-bold">
              Armá tu plan personalizado
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

