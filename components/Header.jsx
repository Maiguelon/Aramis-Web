import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Next.js 13+
import { useState } from 'react';

// Configuración de los links del nav
const navLinks = [
  { label: "Inicio", href: "/" },
  { label: "Planes", href: "/planes" },
  { label: "Tu plan a medida", href: "/plan_personalizado" },
  { label: "Nosotros", href: "/acerca_de" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="bg-primary text-bg-light px-6 py-3 shadow-2xl border-b-4 border-accent-yellow relative z-30 sticky top-0">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 h-12 md:h-14"> {/* Ajusta el alto del contenedor */}
          <div className="relative h-full aspect-square flex-shrink-0">
            <Image
              src="/img/logoAramis.png"
              alt="Aramis Logo"
              fill
              style={{ objectFit: "contain" }} // Ocupa todo el cuadrado sin deformar
              priority
              sizes="48px"
              className="rounded-full"
            />
          </div>
        </Link>


        {/* Nav Desktop */}
        <nav className="hidden md:flex space-x-4">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`
                  px-4 py-1 rounded-full font-semibold transition-all border-2
                  ${isActive
                    ? 'bg-white text-primary border-accent-yellow shadow-sm'
                    : 'bg-transparent text-bg-light border-transparent'
                  }
                  hover:bg-accent-yellow hover:text-primary focus:outline-none focus:ring-2 focus:ring-accent-yellow
                `}
                style={{
                  boxShadow: isActive ? '0 2px 8px 0 #f4b94322' : 'none'
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* Menú Hamburguesa Mobile */}
        <button
          className="md:hidden p-2 rounded focus:outline-none focus:ring-2 focus:ring-accent-yellow"
          onClick={() => setOpen(!open)}
          aria-label="Abrir menú"
        >
          <span className="block w-6 h-0.5 bg-bg-light mb-1"></span>
          <span className="block w-6 h-0.5 bg-bg-light mb-1"></span>
          <span className="block w-6 h-0.5 bg-bg-light"></span>
        </button>

        {/* Mobile Menu (Overlay) */}
        {open && (
          <nav className="absolute top-full right-4 mt-2 bg-primary rounded-xl shadow-md flex flex-col items-end p-4 gap-2 md:hidden border border-bg-light z-30">
            {navLinks.map(({ label, href }) => {
              const isActive = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={`
                    w-full px-4 py-2 rounded-full font-semibold border-2
                    ${isActive
                      ? 'bg-white text-primary border-accent-yellow shadow-sm'
                      : 'bg-transparent text-bg-light border-transparent'
                    }
                    hover:bg-accent-yellow hover:text-primary transition
                  `}
                  style={{
                    boxShadow: isActive ? '0 2px 8px 0 #f4b94322' : 'none'
                  }}
                  onClick={() => setOpen(false)}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        )}
      </div>
    </header>
  );
}



