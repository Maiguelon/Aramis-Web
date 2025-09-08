// components/CasoCard.jsx
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Instagram, Globe, Phone } from "lucide-react";
import { FaFacebook, FaWhatsapp, FaTiktok } from "react-icons/fa";

const iconMap = {
  Instagram: (hovered) => (
    <Instagram
      className={`inline mr-1 transition-colors duration-200 ${hovered ? "text-primary" : "text-red-500"}`}
      size={17}
    />
  ),
  Facebook: (hovered) => (
    <FaFacebook
      className={`inline mr-1 transition-colors duration-200 ${hovered ? "text-primary" : "text-accent-blue"}`}
      size={17}
    />
  ),
  WhatsApp: (hovered) => (
    <FaWhatsapp
      className={`inline mr-1 transition-colors duration-200 ${hovered ? "text-primary" : "text-green-600"}`}
      size={17}
    />
  ),
  Teléfono: (hovered) => (
    <Phone
      className={`inline mr-1 transition-colors duration-200 ${hovered ? "text-primary" : "text-primary"}`}
      size={17}
    />
  ),
  "Sitio web": (hovered) => (
    <Globe
      className={`inline mr-1 transition-colors duration-200 ${hovered ? "text-primary" : "text-accent-blue"}`}
      size={17}
    />
  ),
  TikTok: (hovered) => (
    <FaTiktok
      className={`inline mr-1 transition-colors duration-200 ${hovered ? "text-primary" : "text-black"}`}
      size={17}
    />
  ),
};

export default function CasoCard({ nombre, logo, descripcion, bullets = [], links = [] }) {
  const [open, setOpen] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={`
        bg-white rounded-2xl shadow-md border-t-4 border-accent-yellow mb-5 transition
        ${open ? "shadow-xl scale-[1.015]" : ""}
      `}
    >
      {/* Header */}
      <button
        className="w-full flex items-center gap-4 p-5 cursor-pointer focus:outline-none group min-h-[80px]"
        onClick={() => setOpen(v => !v)}
        aria-expanded={open}
        aria-controls={`caso-details-${nombre.replace(/\s/g, "")}`}
      >
        {/* Logo sin caja, más grande */}
        <div className="flex-shrink-0">
          <Image
            src={logo}
            alt={nombre}
            width={64}
            height={64}
            className="object-contain h-16 w-16"
          />
        </div>

        {/* Nombre */}
        <span className={`font-serif text-lg font-bold text-black flex-1 text-left ${!open ? "line-clamp-2" : ""}`}>
          {nombre}
        </span>

        {/* Flecha */}
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.28 }}
          className="ml-2 text-accent-yellow"
        >
          <ChevronDown size={28} />
        </motion.span>
      </button>

      {/* Detalle */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`caso-details-${nombre.replace(/\s/g, "")}`}
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="overflow-hidden px-7 pb-5 pt-2 relative"
          >
            {/* Logo marca de agua más visible */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
            >
              <div className="relative w-[420px] h-[420px] opacity-20">
                <Image src={logo} alt="" fill sizes="420px" className="object-contain" />
              </div>
            </div>

            {/* Contenido */}
            <div className="relative z-10">
              {descripcion && <p className="mb-3 text-black">{descripcion}</p>}

              {bullets.length > 0 && (
                <ul className="mb-2 list-disc ml-5 text-black space-y-1">
                  {bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              )}

              {links.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3">
                  {links.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                        group bg-accent-blue/10 text-accent-blue font-semibold px-3 py-1 rounded-full
                        hover:bg-accent-yellow hover:text-primary transition-colors shadow-sm text-sm flex items-center
                      "
                      onMouseEnter={() => setHoveredIndex(i)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {iconMap[link.label] ? iconMap[link.label](hoveredIndex === i) : null}
                      {link.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}




