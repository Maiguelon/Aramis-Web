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
        bg-white/10 rounded-2xl shadow-md border-t-4 border-accent-yellow mb-5 transition
        ${open ? "shadow-xl scale-[1.015]" : ""}
      `}
        >
            {/* Header uniforme */}
            <button
                className="
          w-full flex items-center gap-4 p-5 cursor-pointer focus:outline-none group
          min-h-[80px]
        "
                onClick={() => setOpen(v => !v)}
                aria-expanded={open}
                aria-controls={`caso-details-${nombre.replace(/\s/g, "")}`}
            >
                {/* Logo, tamaño fijo */}
                <span className="flex-shrink-0 bg-bg-light rounded-xl p-2 border border-accent-blue/40 h-12 w-12 flex items-center justify-center">
                    <Image
                        src={logo}
                        alt={nombre}
                        width={44}
                        height={44}
                        className="object-contain max-h-10 max-w-10"
                    />
                </span>
                {/* Nombre, máximo 2 líneas */}
                <span
                    className={`font-serif text-lg font-bold text-black flex-1 text-left ${!open ? "line-clamp-2" : ""
                        }`}
                >
                    {nombre}
                </span>
                {/* Flechita */}
                <motion.span
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.28 }}
                    className="ml-2 text-accent-yellow"
                >
                    <ChevronDown size={28} />
                </motion.span>
            </button>

            {/* Detalle animado */}
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        id={`caso-details-${nombre.replace(/\s/g, "")}`}
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.4 }}
                        className="overflow-hidden px-7 pb-5 pt-2"
                    >
                        {/* Descripción */}
                        {descripcion && <p className="mb-3 text-black">{descripcion}</p>}
                        {/* Bullets */}
                        {bullets.length > 0 && (
                            <ul className="mb-2 list-disc ml-5 text-black space-y-1">
                                {bullets.map((b, i) => <li key={i}>{b}</li>)}
                            </ul>
                        )}
                        {/* Links */}
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
                                        {/* Ícono cambia color con hover */}
                                        {iconMap[link.label]
                                            ? iconMap[link.label](hoveredIndex === i)
                                            : null}
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}


