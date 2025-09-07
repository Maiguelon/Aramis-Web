import CasoCard from "../components/CasoCard";
import casosPorRubro from "../data/casos.json";

export default function Casos() {
  return (
    <main className="max-w-5xl mx-auto py-12 px-4">
      {/* Hero principal */}
      <div className="
  mb-10
  text-center
  bg-white/90
  rounded-2xl
  border-t-8 border-accent-yellow
  shadow-xl
  py-8
">
        <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-3">
          Quienes ya confían en nosotros
        </h1>
        <p className="text-lg text-secondary max-w-xl mx-auto">
          Mirá algunos de los casos con los que trabajamos en diferentes rubros y realidades.
        </p>
      </div>

      {/* Rubros y casos */}
      {casosPorRubro.map(({ rubro, casos }) => (
        <section
          key={rubro}
          className="mb-16 bg-white/80 rounded-2xl shadow-md px-6 py-8"
        >
          <h2 className="
            text-lg font-bold text-accent-blue uppercase tracking-wide mb-6
            border-l-4 border-accent-yellow pl-4
          ">
            {rubro}
          </h2>
          <div className="space-y-4">
            {casos.map((c, idx) => (
              <CasoCard key={c.nombre + idx} {...c} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}


