 // === Header.jsx (inicio) ===
 import Link from 'next/link';
 import Image from 'next/image';
 import { usePathname } from 'next/navigation'; // Next.js 13+
 import { useState } from 'react';
 
 // Configuración de los links del nav
 const navLinks = [
   { label: "Inicio", href: "/" },
   { label: "Planes", href: "/planes" },
   { label: "Tu plan a medida", href: "/plan_personalizado" },
   { label: "Nuestro trabajo", href: "/casos" },
   { label: "Nosotros", href: "/acerca_de" },
 ];
 
 export default function Header() {
   const [open, setOpen] = useState(false);
   const pathname = usePathname();
 
   return (
    <header className="bg-primary text-bg-light px-6 py-3 shadow-2xl border-b-4 border-accent-yellow sticky top-0 z-50">
       <div className="max-w-7xl mx-auto flex justify-between items-center">
         {/* Logo */}
         <Link href="/" className="flex items-center gap-2 h-12 md:h-14"> {/* Ajusta el alto del contenedor */}
           <div className="relative h-full aspect-square flex-shrink-0">
             <Image
               src="/img/stock/logoAramis.png"
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
  // === Header.jsx (fin) ===

  // === Footer.jsx (inicio) ===
import { useState } from "react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      setEnviado(true);
      form.reset();
      setTimeout(() => setEnviado(false), 5000);
    }
  };

  return (
    <footer className="bg-secondary text-bg-light px-6 py-10 mt-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Contacto */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contacto</h2>
          {/* WhatsApp */}
          <p className="mb-2 flex items-center gap-2">
            <FaWhatsapp className="text-accent-yellow" />
            <a
              href="https://wa.me/5493812137220"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              aria-label="WhatsApp Aramis Agency"
            >
              +54 9 381 2137-220
            </a>
          </p>
          {/* Facebook */}
          <p className="mb-2 flex items-center gap-2">
            <FaFacebook className="text-bg-light" />
            <a
              href="https://www.facebook.com/people/Aramis-Agency/61576984280512/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              aria-label="Facebook Aramis Agency"
            >
              /Aramis-Agency
            </a>
          </p>
          {/* Instagram */}
          <p className="mb-2 flex items-center gap-2">
            <FaInstagram className="text-accent-yellow" />
            <a
              href="https://www.instagram.com/aramisagency/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
              aria-label="Instagram Aramis Agency"
            >
              @aramisagency
            </a>
          </p>
          {/* Mail */}
          <p className="mb-2 flex items-center gap-2">
            <FaEnvelope className="text-bg-light" />
            <a
              href="mailto:hola@aramis.agency"
              className="hover:underline"
              aria-label="Enviar email a Aramis"
            >
              hola@aramis.agency
            </a>
          </p>
        </div>

        {/* Formulario */}
        <form
          onSubmit={handleSubmit}
          action="https://formspree.io/f/movwqvag"
          method="POST"
          className="space-y-4"
        >
          <h2 className="text-xl font-bold mb-2">¿Querés que te contactemos?</h2>
          <input
            type="text"
            name="nombre"
            required
            placeholder="Tu nombre"
            className="w-full p-2 rounded text-primary"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Tu email"
            className="w-full p-2 rounded text-primary"
          />
          <input
            type="text"
            name="redes"
            placeholder="Redes sociales (opcional)"
            className="w-full p-2 rounded text-primary"
          />

          <button
            type="submit"
            className="bg-accent-yellow hover:bg-bg-light text-primary px-4 py-2 rounded-md font-semibold transition"
          >
            Enviar
          </button>
          {enviado && (
            <div className="mt-4 bg-green-500 text-bg-light p-2 rounded-md">
              ¡Gracias! Te vamos a contactar pronto.
            </div>
          )}
        </form>
      </div>
    </footer>
  );
}
  // === Footer.jsx (fin) ===