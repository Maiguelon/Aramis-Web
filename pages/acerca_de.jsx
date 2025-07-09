import Image from 'next/image';

const equipo = [
  {
    nombre: 'Eric Esquivel',
    rol: 'Lic. en Comercialización',
    desc: 'Apasionado por el marketing y la estrategia comercial, Eric es quien conecta la agencia con cada cliente, asegurando un servicio humano, atento y siempre enfocado en los resultados.',
    foto: '/img/equipo/eric.jpg',
  },
  {
    nombre: 'Eliana Carretero',
    rol: 'Profesora de Artes Visuales y Diseñadora',
    desc: 'Eliana aporta creatividad, mirada estética y experiencia en artes visuales. Da forma a la identidad visual de cada marca, con diseños originales y pensados para destacar.',
    foto: '/img/equipo/eliana.jpg',
  },
  {
    nombre: 'Miguel Carretero',
    rol: 'Lic. en Comercialización y Programador',
    desc: 'Miguel combina visión comercial y técnica, desarrollando soluciones digitales a medida. Es el encargado de llevar las ideas al mundo web, siempre buscando innovar.',
    foto: '/img/equipo/miguel.jpg',
  }
];

export default function Nosotros() {
  return (
    <main className="container mx-auto px-4 py-12">
      {/* Header general */}
      <div className="
  max-w-2xl mx-auto mb-10
  rounded-2xl
  shadow-2xl
  bg-white/85
  border-t-8 border-accent-yellow
  backdrop-blur-md
  text-center
  py-10
">
  <h1 className="text-4xl md:text-5xl font-serif font-bold text-primary inline-block relative z-10">
    Nosotros
  </h1>
  <span className="block h-2 w-24 bg-accent-yellow rounded-full mx-auto mt-4"></span>
</div>


      {/* Intro */}
      <div className="max-w-2xl mx-auto mb-12 bg-white/80 p-6 rounded-2xl shadow border-l-4 border-accent-yellow">
        <p className="text-lg text-center text-gray-800">
          En <span className="font-bold text-secondary">Aramís</span> nos une la pasión por ayudar a marcas y emprendedores a crecer, mezclando estrategia, creatividad y tecnología. <br />
          Trabajamos de manera cercana, transparente y orientada a resultados.
        </p>
      </div>

      {/* Equipo */}
      <section>
        <h2 className="text-2xl font-serif font-bold text-center mb-8 text-secondary relative">
          Nuestro equipo
          <span className="block h-1 w-16 bg-accent-yellow rounded-full mx-auto mt-2"></span>
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {equipo.map(({ nombre, rol, desc, foto }, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl shadow-xl border-t-4 border-accent-yellow flex flex-col items-center p-8 transition hover:-translate-y-1 hover:shadow-2xl duration-200"
            >
              <div className="mb-5">
                <Image
                  src={foto}
                  alt={nombre}
                  width={130}
                  height={130}
                  className="rounded-full object-cover border-4 border-accent-blue shadow-lg"
                />
              </div>
              <h3 className="font-serif font-bold text-xl text-primary mb-1">{nombre}</h3>
              <p className="text-accent-blue font-semibold mb-2">{rol}</p>
              <p className="text-gray-700 text-center">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visión y valores */}
      <section className="mt-16 max-w-3xl mx-auto text-center bg-white/70 rounded-2xl shadow-md p-8 border-l-4 border-accent-yellow">
        <h2 className="text-xl font-serif font-bold mb-4 text-accent-blue relative">
          Nuestra visión
          <span className="block h-1 w-16 bg-accent-yellow rounded-full mx-auto mt-2"></span>
        </h2>
        <p className="text-gray-800 mb-3">
          Creemos que el marketing digital debe ser cercano, humano y personalizado. Nos importa el proceso, pero más aún los resultados que nuestros clientes pueden ver y sentir en sus proyectos.
        </p>
        <p className="text-gray-800">
          Nuestro compromiso es acompañarte desde el primer día, adaptándonos a tus necesidades y dándote herramientas concretas para que tu marca crezca de verdad.
        </p>
      </section>
    </main>
  );
}


