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
      fraseOverlay: "Grabamos, preparamos y programamos tu contenido profesionalmente.",
      icon: <Monitor size={26} className="text-accent-blue drop-shadow-md mt-1" />,
      img: "/img/stock/redes.webp",
    },
    {
      titulo: "Identidad Visual",
      desc: "Diseños claros y memorables que conectan.",
      fraseOverlay: "Diseñamos marcas que conectan y diferencian.",
      icon: <Palette size={26} className="text-secondary drop-shadow-md mt-1" />, // agregamos drop-shadow para que resalte
      img: "/img/stock/identidad.webp",
    },
    {
      titulo: "Páginas Web",
      desc: "Tu negocio en línea con estilo y eficacia.",
      fraseOverlay: "Creamos sitios web modernos, listos para crecer.",
      icon: <Globe size={26} className="text-accent-yellow drop-shadow-md mt-1" />,
      img: "/img/stock/web.webp",
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
      <section className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {servicios.map((serv, idx) => (
          <div
            key={serv.titulo}
            className="relative rounded-3xl overflow-hidden shadow-lg group h-80 flex items-end border-b-4 border-transparent hover:border-accent-yellow transition-all duration-300"
          >
            {/* Imagen de fondo */}
            <img
              src={serv.img}
              alt={serv.titulo}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            {/* Overlay al hover */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/80 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-25 px-6">
              <p className="text-white text-lg font-semibold text-center drop-shadow-lg">{serv.fraseOverlay}</p>
            </div>
            {/* Degradé abajo + contenido */}
            <div className="relative z-10 w-full h-full flex flex-col justify-end">
              {/* Degradé en el fondo abajo (más oscuro) */}
              <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black/85 via-black/60 to-transparent z-10"></div>
              {/* Contenido sobre el degradé */}
              <div className="relative z-20 p-6 pb-5 text-left flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-2">
                  {serv.icon}
                  <h3 className="text-2xl font-bold text-white font-serif drop-shadow">{serv.titulo}</h3>
                </div>
                <p className="text-white/90 text-base drop-shadow">{serv.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </section>


      {/* ¿Por qué elegirnos? */}
      {/* <section className="py-10">
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
      </section> */}

      {/* CTA Casos/clientes */}
      <section className="py-0">
        <div className="
    max-w-3xl mx-auto
    bg-white/90
    rounded-2xl
    shadow-lg
    border-l-4 border-accent-yellow
    px-7 py-9
    text-center
    mb-10
  ">
          {/* Título de clientes, más grande */}
          <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 tracking-wide">
            Nuestros clientes
          </h3>
          {/* Cinta de logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-4">
            <img src="/img/clientes/aura-logo.png" alt="AURA" className="h-20 w-auto object-contain scale-110" />
            <img src="/img/clientes/beecomex-logo.png" alt="BeeComex" className="h-14 w-auto object-contain" />
            <img src="/img/clientes/dymec-logo.png" alt="DYmec" className="h-14 w-auto object-contain" />
            <img src="/img/clientes/walter-logo.png" alt="Walter Villegas" className="h-14 w-auto object-contain" />
          </div>
        </div>

        {/* Collage FUERA de la caja */}
        <div className="relative w-full max-w-3xl mx-auto rounded-xl overflow-hidden shadow-md min-h-[240px] mb-2 mt-[-28px]">
          {/* Imagen del collage */}
          <img
            src="/img/clientes/collage.png"
            alt="Collage de trabajos de Aramís"
            className="w-full h-64 object-cover"
          />
          {/* Overlay de título + botón */}
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-transparent">
            <h2 className="text-3xl md:text-4xl font-serif font-extrabold text-white drop-shadow-lg mb-4 px-4 text-center"
              style={{
                textShadow: "0 3px 18px #000, 0 1px 2px #000",
                background: "rgba(0,0,0,0.32)",
                borderRadius: "12px",
              }}
            >
              Conocé nuestro trabajo
            </h2>
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
        </div>
      </section>

      {/* CTA final */}
      <section className="py-12 text-center">
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