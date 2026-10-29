import { useState } from "react";
import { FaWhatsapp, FaFacebook, FaInstagram, FaEnvelope } from "react-icons/fa";
import TallyLeadLink, { TALLY_ENABLED } from './TallyLeadLink';
import { CONTACT_CONSENT } from '../lib/lead-intake.mjs';

export default function Footer() {
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    setEnviando(true); setError('');
    try {
      const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: { Accept: "application/json" },
    });

    if (!response.ok) throw new Error('submission_failed');
      setEnviado(true);
      form.reset();
      setTimeout(() => setEnviado(false), 5000);
    } catch { setError('No pudimos confirmar el envío. Podés intentarlo de nuevo o escribirnos por WhatsApp.'); }
    finally { setEnviando(false); }
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
        {TALLY_ENABLED ? <div className="space-y-4"><h2 className="text-xl font-bold">¿Querés que te contactemos?</h2><p className="max-w-md">Contanos qué necesitás y revisaremos tu consulta personalmente.</p><TallyLeadLink sourceForm="footer" /></div> : <form
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

          <label className="flex items-start gap-2 text-sm">
            <input type="checkbox" name="consentimiento_contacto" value="true" required className="mt-1" />
            <span>{CONTACT_CONSENT}</span>
          </label>
          <button disabled={enviando}
            type="submit"
            className="bg-accent-yellow hover:bg-bg-light text-primary px-4 py-2 rounded-md font-semibold transition"
          >
            {enviando ? 'Enviando…' : 'Enviar'}
          </button>
          {enviado && (
            <div className="mt-4 bg-green-500 text-bg-light p-2 rounded-md">
              ¡Gracias! Te vamos a contactar pronto.
            </div>
          )}
          {error && <p role="alert">{error}</p>}
        </form>}
      </div>
    </footer>
  );
}


