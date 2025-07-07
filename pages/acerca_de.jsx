// pages/nosotros.jsx
import Image from 'next/image';

const equipo = [
  {
    nombre: 'Eric Esquivel',
    rol: 'Lic. en Comercialización',
    desc: 'Apasionado por el marketing y la estrategia comercial, Eric es quien conecta la agencia con cada cliente, asegurando un servicio humano, atento y siempre enfocado en los resultados.',
    foto: '/img/eric.jpg', // Cambia por el nombre exacto del archivo
  },
  {
    nombre: 'Eliana Carretero',
    rol: 'Profesora de Artes Visuales y Diseñadora',
    desc: 'Eliana aporta creatividad, mirada estética y experiencia en artes visuales. Da forma a la identidad visual de cada marca, con diseños originales y pensados para destacar.',
    foto: '/img/eliana.jpg', // Cambia por el nombre exacto del archivo
  },
  {
    nombre: 'Miguel Carretero',
    rol: 'Lic. en Comercialización y Programador',
    desc: 'Miguel combina visión comercial y técnica, desarrollando soluciones digitales a medida. Es el encargado de llevar las ideas al mundo web, siempre buscando innovar.',
    foto: '/img/miguel.jpg', // Cambia por el nombre exacto del archivo
  }
];

export default function Nosotros() {
  return (
    <main className="container mx-auto px-4 py-10">
      {/* Presentación general */}
      <h1 className="text-3xl font-bold text-center mb-6">Nosotros</h1>
      <p className="text-lg text-center max-w-2xl mx-auto mb-10 text-gray-700">
        En <span className="font-semibold text-indigo-700">Aramis</span> nos une la pasión por ayudar a marcas y emprendedores a crecer, mezclando estrategia, creatividad y tecnología. 
        Trabajamos de manera cercana, transparente y orientada a resultados.
      </p>

      {/* Sección Equipo */}
      <section>
        <h2 className="text-2xl font-semibold text-center mb-6">Nuestro equipo</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {equipo.map(({ nombre, rol, desc, foto }, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow p-6 text-center flex flex-col items-center">
              <div className="mb-4">
                <Image
                  src={foto}
                  alt={nombre}
                  width={120}
                  height={120}
                  className="rounded-full object-cover border-4 border-indigo-200"
                />
              </div>
              <h3 className="font-bold text-lg mb-1">{nombre}</h3>
              <p className="text-indigo-600 font-semibold mb-2">{rol}</p>
              <p className="text-gray-600">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Visión y valores */}
      <section className="mt-16 max-w-3xl mx-auto text-center">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Nuestra visión</h2>
        <p className="text-gray-700 mb-3">
          Creemos que el marketing digital debe ser cercano, humano y personalizado. Nos importa el proceso, pero más aún los resultados que nuestros clientes pueden ver y sentir en sus proyectos.
        </p>
        <p className="text-gray-700">
          Nuestro compromiso es acompañarte desde el primer día, adaptándonos a tus necesidades y dándote herramientas concretas para que tu marca crezca de verdad.
        </p>
      </section>
    </main>
  );
}

