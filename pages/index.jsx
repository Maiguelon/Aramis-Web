// pages/index.jsx
import Header from '../components/Header';
import Footer from '../components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from "framer-motion";
import { Monitor, Palette, Globe, CheckCircle } from 'lucide-react';

export default function Home() {
  const servicios = [
    {
      titulo: "Redes Sociales",
      desc: "Contenido profesional para destacar tu marca.",
      fraseOverlay: "Grabamos, preparamos y programamos tu contenido profesionalmente.",
      icon: <Monitor size={26} className="text-accent-blue drop-shadow-md mt-1" />,
      img: "/img/stock/redes.webp",
      alt: "Gestión y creación de contenido para redes sociales"
    },
    {
      titulo: "Identidad Visual",
      desc: "Diseños claros y memorables que conectan.",
      fraseOverlay: "Diseñamos marcas que conectan y diferencian.",
      icon: <Palette size={26} className="text-secondary drop-shadow-md mt-1" />,
      img: "/img/stock/identidad.webp",
      alt: "Diseño de identidad de marca y piezas gráficas"
    },
    {
      titulo: "Páginas Web",
      desc: "Tu negocio en línea con estilo y eficacia.",
      fraseOverlay: "Creamos sitios web modernos, listos para crecer.",
      icon: <Globe size={26} className="text-accent-yellow drop-shadow-md mt-1" />,
      img: "/img/stock/web.webp",
      alt: "Desarrollo de sitios web modernos"
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* Hero minimalista mejorado */}
      <section className="bg-lightprimary text-bg-light flex flex-col items-center text-center min-h-[calc(100vh-80px)] pt-36 pb-8 px-4">
       
        {/* Logo */}
        <div className="relative w-full max-w-[260px] md:max-w-[300px] mb-1">
          <Image
            src="/img/stock/logoAramis.png"
            alt="Aramis Logo"
            width={300}
            height={300}
            style={{ objectFit: "contain", height: "auto" }}
            priority
          />
        </div>

        {/* Tagline */}
        <h1 className="text-xl md:text-2xl font-medium max-w-2xl leading-snug mb-10">
          Impulsamos tu marca con creatividad, estrategia y tecnología
        </h1>


        {/* Botones */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/plan_personalizado"
            className="px-8 py-3 rounded-full font-semibold text-primary bg-accent-yellow hover:bg-accent-yellow/90 shadow-lg transition transform hover:scale-105"
          >
            Crear plan personalizado
          </Link>
          <Link
            href="/planes"
            className="px-8 py-3 rounded-full font-semibold border-2 border-accent-yellow text-accent-yellow transition-colors duration-300 hover:bg-white hover:text-primary shadow-lg"
          >
            Ver planes armados
          </Link>
        </div>
      </section>


      {/* Bloques de servicios */}
      <section className="container mx-auto px-4 py-12 grid md:grid-cols-3 gap-8">
        {servicios.map((serv) => (
          <div
            key={serv.titulo}
            className="relative rounded-3xl overflow-hidden shadow-lg group h-80 flex items-end border-b-4 border-transparent hover:border-accent-yellow transition-all duration-300"
          >
            {/* Imagen de fondo con next/image */}
            <div className="absolute inset-0 -z-10">
              <Image
                src={serv.img}
                alt={serv.alt}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                style={{ objectFit: "cover" }}
                priority
              />
            </div>

            {/* Overlay al hover */}
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/80 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100 z-30 px-6">
              <p className="text-white text-lg font-semibold text-center drop-shadow-lg">
                {serv.fraseOverlay}
              </p>
            </div>

            {/* Degradé + contenido */}
            <div className="relative z-10 w-full h-full flex flex-col justify-end">
              <div className="absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-black/85 via-black/60 to-transparent z-10"></div>
              <div className="relative z-20 p-6 pb-5 text-left flex flex-col gap-1">
                <div className="flex items-center gap-2 mb-2">
                  {serv.icon}
                  <h3 className="text-2xl font-bold text-white font-serif drop-shadow">
                    {serv.titulo}
                  </h3>
                </div>
                <p className="text-white/90 text-base drop-shadow">{serv.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* CTA Casos/clientes */}
      <section className="py-12">
        <div
          className="
            max-w-3xl mx-auto bg-white/90 rounded-2xl shadow-lg
            border-l-4 border-accent-yellow px-7 py-9 text-center mb-8
          "
        >
          <h3 className="text-lg font-bold text-primary mb-2 tracking-wide">
            Nuestros clientes
          </h3>

          {/* Cinta de logos */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-8">
            <Image src="/img/clientes/aura-logo.png" alt="AURA" width={120} height={48} />
            <Image src="/img/clientes/beecomex-logo.png" alt="BeeComex" width={140} height={48} />
            <Image src="/img/clientes/dymec-logo.png" alt="DYmec" width={120} height={48} />
            <Image src="/img/clientes/walter-logo.png" alt="Walter Villegas" width={140} height={48} />
          </div>

          {/* Collage con overlay centrado */}
          <div className="relative w-full rounded-xl overflow-hidden shadow-md min-h-[240px] mb-2">
            <Image
              src="/img/clientes/collage.png"
              alt="Collage de trabajos de Aramís"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
              priority={false}
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/30">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-white drop-shadow-lg mb-4">
                Conocé nuestro trabajo
              </h2>
              <Link
                href="/casos"
                className="
                  inline-block bg-accent-blue hover:bg-accent-yellow
                  text-white hover:text-primary px-8 py-3 rounded-full
                  font-bold text-lg shadow-lg border-2 border-accent-yellow
                  transition-all duration-300
                "
                aria-label="Ver casos y clientes"
              >
                Ver casos y clientes
              </Link>
            </div>
          </div>
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
          <Link href="/planes" aria-label="Ver planes disponibles">
            <button className="mt-3 bg-accent-blue text-white text-lg px-8 py-3 rounded-full font-bold shadow-lg hover:bg-accent-yellow hover:text-primary border-2 border-accent-yellow transition-all">
              Ver planes
            </button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
