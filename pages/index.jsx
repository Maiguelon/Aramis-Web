// pages/index.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero principal */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Aramis</h1>
        <p className="text-xl md:text-2xl mb-8">Marketing Digital que impulsa tu negocio</p>
        <Link href="/plan_personalizado">
          <button className="bg-white text-indigo-600 font-semibold px-6 py-2 rounded-full hover:bg-gray-100">
            Armá tu plan personalizado
          </button>
        </Link>
      </section>

      {/* Breve presentación de servicios */}
      <section className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8 text-center">
        <div>
          <h3 className="text-xl font-semibold mb-2">Redes Sociales</h3>
          <p className="text-gray-600">Contenido profesional para destacar tu marca.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Identidad Visual</h3>
          <p className="text-gray-600">Diseños claros y memorables que conectan.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Páginas Web</h3>
          <p className="text-gray-600">Tu negocio en línea con estilo y eficacia.</p>
        </div>
      </section>

      {/* ¿Por qué elegirnos? */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">¿Por qué elegir Aramis?</h2>
          <ul className="max-w-2xl mx-auto space-y-4 text-gray-700 list-disc pl-5">
            <li>Planes claros y personalizados según tu necesidad.</li>
            <li>Enfoque práctico orientado a resultados reales.</li>
            <li>Soporte dedicado y cercano.</li>
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-12 text-center">
        <h3 className="text-xl font-semibold mb-4">¿Listo para impulsar tu marca?</h3>
        <Link href="/planes">
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
            Mirá nuestros planes
          </button>
        </Link>
      </section>
    </div>
  );
}
