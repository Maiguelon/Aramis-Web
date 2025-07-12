import CasoCard from "../components/CasoCard";
import casosPorRubro from "../data/casos.json";

export default function Casos() {
  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
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
        <h1 className="text-4xl font-serif font-bold text-primary mb-3">
          Quienes ya confían en nosotros
        </h1>
        <p className="text-lg text-secondary">
          Mirá algunos de los casos con los que trabajamos en diferentes rubros y realidades.
        </p>
      </div>

      {/* Rubros y casos */}
      {casosPorRubro.map(({ rubro, casos }) => (
        <section
          key={rubro}
          className="mb-14 p-6 rounded-2xl bg-white/80 shadow border-l-4 border-accent-yellow"
        >
          <h2 className="text-2xl font-serif font-semibold text-primary mb-6">
            {rubro}
          </h2>
          <div className="space-y-3">
            {casos.map((c, idx) => (
              <CasoCard key={c.nombre + idx} {...c} />
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

