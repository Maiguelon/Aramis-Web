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
      <section className="container mx-auto px-4 py-20 rounded-2xl shadow-lg bg-gradient-to-r from-primary to-accent-blue text-white text-center mt-6">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Aramis</h1>
        <p className="text-xl md:text-2xl mb-8 font-sans">Marketing Digital que impulsa tu negocio</p>
        <Link href="/plan_personalizado">
          <button className="bg-white text-primary font-semibold px-6 py-2 rounded-full hover:bg-bg-light transition">
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
      <section className="relative bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8 relative inline-block">
            ¿Por qué elegir Aramis?
            <span className="block h-1 w-16 bg-accent-yellow rounded-full absolute left-1/2 -translate-x-1/2 mt-2"></span>
          </h2>
          <ul className="max-w-2xl mx-auto space-y-4 text-gray-700 list-none pl-0 text-left">
            {[
              "Planes claros y personalizados según tu necesidad.",
              "Enfoque práctico orientado a resultados reales.",
              "Soporte dedicado y cercano."
            ].map((txt, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.13 + 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="flex items-center gap-3 text-lg"
              >
                <CheckCircle className="text-accent-yellow" size={24} />
                <span>{txt}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-16 bg-gradient-to-r from-accent-blue/10 to-accent-yellow/10 text-center">
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