import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import { motion } from "framer-motion";
import { Monitor, Palette, Globe } from 'lucide-react';
import { CheckCircle } from 'lucide-react';

export default function Home() {
  // 1. Acá van las constantes y helpers
  const servicios = [
    {
      titulo: "Redes Sociales",
      desc: "Contenido profesional para destacar tu marca.",
      icon: "Monitor",
    },
    {
      titulo: "Identidad Visual",
      desc: "Diseños claros y memorables que conectan.",
      icon: "Palette",
    },
    {
      titulo: "Páginas Web",
      desc: "Tu negocio en línea con estilo y eficacia.",
      icon: "Globe",
    },
  ];

  function getIcon(nombre) {
    const size = 40;
    if (nombre === "Monitor") return <Monitor size={size} className="text-accent-blue mb-2" />;
    if (nombre === "Palette") return <Palette size={size} className="text-secondary mb-2" />;
    if (nombre === "Globe") return <Globe size={size} className="text-accent-yellow mb-2" />;
    return null;
  }

  // 2. Acá va el return (el JSX):
  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero principal */}
      <section className="
  container mx-auto px-4 py-16 md:py-20 
  rounded-2xl 
  shadow-2xl 
  bg-white/85
  border-t-8 border-accent-yellow
  backdrop-blur-md
  text-center 
  mt-6
">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif text-primary drop-shadow-sm">Aramis</h1>
        <p className="text-xl md:text-2xl mb-8 font-sans text-primary">Marketing Digital que impulsa tu negocio</p>
        <Link href="/plan_personalizado">
          <button className="bg-white text-primary font-semibold px-6 py-2 rounded-full shadow-lg border-2 border-accent-yellow hover:bg-accent-yellow hover:text-primary transition-all">
            Armá tu plan personalizado
          </button>
        </Link>
      </section>


      {/* Bloques animados de servicios */}
      <section className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8 text-center">
        {servicios.map((serv, idx) => (
          <motion.div
            key={serv.titulo}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 + 0.2, duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl shadow-lg p-8 flex flex-col items-center
              border-b-4
              hover:-translate-y-2 hover:scale-105 hover:shadow-2xl transition-all duration-300
              hover:border-accent-yellow
              border-transparent"
          >
            {getIcon(serv.icon)}
            <h3 className="text-xl font-bold mb-2 text-secondary">{serv.titulo}</h3>
            <p className="text-gray-600">{serv.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* ¿Por qué elegirnos? */}
      <section className="py-10">
        <div className="max-w-xl mx-auto bg-white/95 rounded-3xl shadow-lg border-l-4 border-accent-yellow px-7 py-7">
          <h2 className="text-2xl font-serif font-bold mb-3 text-primary text-left">
            ¿Por qué elegir Aramis?
            <span className="block h-1 w-16 bg-accent-yellow rounded-full mt-1"></span>
          </h2>
          <ul className="space-y-4 mt-6">
            {[
              "Planes claros y personalizados según tu necesidad.",
              "Enfoque práctico orientado a resultados reales.",
              "Soporte dedicado y cercano."
            ].map((txt, idx) => (
              <li key={idx} className="flex items-start gap-3 text-lg text-primary">
                <svg className="min-w-6 min-h-6 mt-1" width={24} height={24} fill="none" stroke="#f4b943" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" stroke="#f4b943" strokeWidth="2" fill="none" />
                  <path d="M8 13l2.5 2.5L16 10" stroke="#f4b943" strokeWidth="2" />
                </svg>
                <span>{txt}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA Casos/clientes */}
      <section className="py-12">
        <div className="
    max-w-3xl mx-auto
    bg-white/90
    rounded-2xl
    shadow-lg
    border-l-4 border-accent-yellow
    px-7 py-9
    text-center
    mb-8
  ">
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-primary mb-3">
            Conocé nuestros casos
          </h2>
          <p className="mb-6 text-primary text-lg">
            Mirá algunas de las marcas y profesionales que ya confían en Aramís.<br />
            Inspirate o descubrí cómo podemos ayudarte también.
          </p>
          <a
            href="/casos"
            className="
        inline-block
        bg-accent-blue hover:bg-accent-yellow
        text-white hover:text-primary
        px-8 py-3 rounded-full
        font-bold text-lg shadow-lg
        border-2 border-accent-yellow
        transition-all duration-300
      "
          >
            Ver casos y clientes
          </a>
        </div>
      </section>


      {/* CTA final */}
      <section className="py-0 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, type: "spring" }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <div className="mb-3 inline-block bg-accent-yellow text-primary px-4 py-1 rounded-full font-bold text-sm tracking-wide shadow">
            ¿Listo para impulsar tu marca?
          </div>
          <br />
          <Link href="/planes">
            <button className="mt-3 bg-accent-blue text-white text-lg px-8 py-3 rounded-full font-bold shadow-lg hover:bg-accent-yellow hover:text-primary transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent-yellow animate-pulse hover:animate-none">
              Mirá nuestros planes
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}