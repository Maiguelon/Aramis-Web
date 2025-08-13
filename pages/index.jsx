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
      <section className="bg-primary text-bg-light flex flex-col items-center text-center min-h-[calc(100vh-80px)] pt-36 pb-8 px-4">

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
      <section className="bg-bg-light">
        <div className="container mx-auto px-4 py-12">
          {/* Eyebrow + Título + Bajada */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <span className="inline-block bg-accent-yellow text-primary px-3 py-1 rounded-full font-bold text-xs tracking-wide">
              Lo hacemos así
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-serif font-bold text-primary">
              Vos te ocupas de tu negocio
            </h2>
            <p className="mt-2 text-gray-700 max-w-2xl mx-auto">
              Del marketing nos encargamos nosotros
            </p>
          </motion.div>

          {/* Grilla de tarjetas */}
          <div className="grid md:grid-cols-3 gap-8">
            {servicios.map((serv) => (
              <div
                key={serv.titulo}
                className="relative rounded-3xl overflow-hidden shadow-lg group h-80 flex items-end border-b-4 border-transparent hover:border-accent-yellow transition-all duration-300"
              >
                {/* Imagen de fondo */}
                <div className="absolute inset-0 z-0">
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
                <div className="relative z-20 w-full h-full flex flex-col justify-end">
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
          </div>
        </div>
      </section>


      {/* Clientes */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 text-center">
          {/* Eyebrow + H2 */}
          <p className="text-accent-blue tracking-[0.2em] uppercase text-xs font-bold">
            Confían en nosotros
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-bg-light mt-2">
            Nuestros clientes
          </h2>

          {/* Logo cloud en color, con alto uniforme */}
          <div className="mt-8 bg-white/90 rounded-2xl shadow-xl px-6 py-8">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-6 justify-items-center
               md:flex md:flex-nowrap md:justify-between md:gap-8">
              {[
                { src: "/img/clientes/aura-logo.png", alt: "AURA", scale: "scale-[1.18] md:scale-[1.22]" },
                { src: "/img/clientes/beecomex-logo.png", alt: "Bee Comex" },
                { src: "/img/clientes/dymec-logo.png", alt: "DYMEC" },
                { src: "/img/clientes/walter-logo.png", alt: "Walter Villegas", scale: "scale-[1.15] md:scale-[1.2]" },
                { src: "/img/clientes/estudio-logo.png", alt: "Estudio de Abogacía", scale: "scale-[1.18] md:scale-[1.22]" }, // <- filename corregido
              ].map(({ src, alt, scale }) => (
                <li key={alt} className="relative h-14 md:h-16 w-full md:w-44">
                  <Image
                    src={src}
                    alt={alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 176px"
                    style={{ objectFit: "contain" }}
                    className={`opacity-90 hover:opacity-100 transition ${scale || ""}`}
                  />
                </li>
              ))}
            </ul>
          </div>

          {/* Rubros informativo */}
          <p className="mt-4 text-bg-light/80 text-sm">
            <span className="font-semibold">Rubros:</span> Salud · Abogacía · Importación · ONGs
          </p>

          {/* Testimonios breves (antes del CTA) */}
          <div className="mt-6 grid md:grid-cols-3 gap-4 text-left">
            <figure className="bg-white/90 rounded-2xl shadow p-4 border-l-4 border-accent-yellow">
              <blockquote className="text-primary/90 italic">
                “Mejoré la comunicación y la llegada a pacientes. Orden, ideas y resultados.”
              </blockquote>
              <figcaption className="mt-3 text-sm text-primary font-semibold">
                Lic. Walter Villegas · Nutrición
              </figcaption>
            </figure>

            <figure className="bg-white/90 rounded-2xl shadow p-4 border-l-4 border-accent-yellow">
              <blockquote className="text-primary/90 italic">
                “Nos ayudaron a profesionalizar la imagen y mantener presencia constante.”
              </blockquote>
              <figcaption className="mt-3 text-sm text-primary font-semibold">
                CÁCERES · DYMEC Dermatología y Estética
              </figcaption>
            </figure>

            <figure className="bg-white/90 rounded-2xl shadow p-4 border-l-4 border-accent-yellow">
              <blockquote className="text-primary/90 italic">
                “Diseño, redes y piezas para campañas: todo a tiempo y con mucha dedicación.”
              </blockquote>
              <figcaption className="mt-3 text-sm text-primary font-semibold">
                AURA · Asociación Civil
              </figcaption>
            </figure>
          </div>

          {/* CTA único */}
          <div className="mt-6">
            <Link
              href="/casos"
              className="inline-block bg-accent-yellow text-primary px-6 py-3 rounded-full font-bold shadow-lg hover:bg-accent-blue hover:text-white transition border-2 border-accent-yellow"
              aria-label="Ver casos y clientes"
            >
              Ver casos y clientes
            </Link>
          </div>
        </div>
      </section>


      {/* CTA final (dos acciones) */}
      <section className="py-6 pb-28 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-2xl mx-auto"
          >
            <div aria-hidden="true" className="h-px w-full max-w-3xl mx-auto mb-8 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-full" />

            <p className="text-accent-blue tracking-[0.2em] uppercase text-xs font-bold">
              Próximo paso
            </p>
            <h2 className="mt-3 text-3xl md:text-4xl font-serif font-bold text-bg-light">
              ¿Listo para impulsar tu marca?
            </h2>
            <p className="mt-2 text-bg-light/80">
              Planes listos para arrancar, o uno a medida según tus objetivos.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/planes"
                className="bg-accent-blue text-white text-lg px-8 py-3 rounded-full font-bold shadow-lg
                     hover:bg-accent-yellow hover:text-primary border-2 border-accent-yellow
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow transition"
              >
                Ver planes
              </Link>
              <Link
                href="/plan_personalizado"
                className="text-accent-yellow border-2 border-accent-yellow text-lg px-8 py-3 rounded-full font-bold
                     hover:bg-white hover:text-primary
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-yellow transition"
              >
                Crear plan personalizado
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
