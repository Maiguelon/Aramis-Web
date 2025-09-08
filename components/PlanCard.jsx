// components/PlanCard.jsx
import React, { useState, useEffect } from 'react';
import { ArrowRightCircle } from 'lucide-react';

const colorStyles = {
  mensual: "border-primary text-primary",
  unicos: "border-secondary text-secondary",
  web: "border-accent-yellow text-accent-yellow",
  mensual_web: "border-accent-blue text-accent-blue",
  unicos_web: "border-accent-orange text-accent-orange",
  combo_total: "border-black text-black bg-gradient-to-b from-primary via-secondary to-accent-yellow", // premium
  primary: "border-primary text-primary",
};

export default function PlanCard({
  titulo = "Tu Plan",
  precioMensual,
  costoUnicos,
  phrases,
  selections,
  color = "primary",
  // 👉 Ahorros por tipo (se muestran por separado si > 0)
  ahorroMensual = 0,
  ahorroUnicos = 0,
}) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [enviadoBanda, setEnviadoBanda] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    redes: ''
  });

  useEffect(() => {
    setEnviado(false);
    setEnviadoBanda(false);
  }, [selections]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      nombre: formData.nombre,
      contacto: formData.contacto,
      redes: formData.redes,
      plan: JSON.stringify({ selections, precioMensual, costoUnicos, frases: phrases })
    };
    try {
      const response = await fetch('https://formspree.io/f/movwqvag', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (response.ok) {
        setEnviado(true);
        setEnviadoBanda(true);
        setMostrarFormulario(false);
        setFormData({ nombre: '', contacto: '', redes: '' });
        setTimeout(() => setEnviado(false), 4000);
      }
    } catch (err) {
      console.error('Error al enviar el formulario:', err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const hayContenido = Object.values(selections).some(
    (val) => val !== 0 && val !== false
  );

  // Resúmenes legibles
  const resumenMensual = [];
  if (selections.posts > 0) resumenMensual.push(`${selections.posts} post${selections.posts > 1 ? 's' : ''}`);
  if (selections.reels > 0) resumenMensual.push(`${selections.reels} reel${selections.reels > 1 ? 's' : ''}`);
  if (selections.historias > 0) resumenMensual.push(`${selections.historias} historia${selections.historias > 1 ? 's' : ''}`);
  if (selections.moderacion) resumenMensual.push("moderación");

  const resumenUnicos = [];
  if (selections.brandbook) resumenUnicos.push("Brandbook");
  if (selections.tarjetas) resumenUnicos.push("Tarjetas");
  if (selections.folletos > 0) resumenUnicos.push(`${selections.folletos} folleto${selections.folletos > 1 ? 's' : ''}`);

  const resumenWeb = [];
  if (selections.tiendanube) resumenWeb.push("Tiendanube");
  if (selections.pagina) resumenWeb.push("Página personalizada");

  const colorClass = colorStyles[color] || colorStyles.primary;
  const premium = color === "combo_total";

  if (!hayContenido) {
    return (
      <div className="bg-white p-8 rounded-3xl shadow-lg border-t-4 border-gray-200 min-h-[300px] flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold mb-2 text-primary font-serif">Tu Plan</h2>
        <p className="text-gray-500">Aguardamos tus selecciones para armar tu plan personalizado.</p>
      </div>
    );
  }

  return (
    <div
      className={`
        ${premium ? "bg-black text-white" : "bg-white"}
        p-8 rounded-3xl shadow-xl border-t-8
        ${colorClass}
        min-h-[400px] flex flex-col justify-between
        hover:shadow-2xl transition-shadow duration-300
      `}
      style={{ borderTopWidth: '10px' }}
    >
      {/* Título */}
      <h2 className={`text-2xl font-bold mb-4 font-serif ${premium ? "text-white" : colorClass}`}>{titulo}</h2>

      {/* Resúmenes con badges */}
      <div className="mb-2 flex flex-col gap-2">
        {resumenMensual.length > 0 && (
          <div>
            <span className="inline-block bg-accent-blue/10 text-accent-blue text-xs px-3 py-1 rounded-full font-semibold mb-1 mr-2">Mensual</span>
            <span className={`text-base ${premium ? "text-white" : "text-gray-800"}`}>{resumenMensual.join(', ')}</span>
          </div>
        )}
        {resumenUnicos.length > 0 && (
          <div>
            <span className="inline-block bg-secondary/10 text-secondary text-xs px-3 py-1 rounded-full font-semibold mb-1 mr-2">Únicos</span>
            <span className={`text-base ${premium ? "text-white" : "text-gray-800"}`}>{resumenUnicos.join(', ')}</span>
          </div>
        )}
        {resumenWeb.length > 0 && (
          <div>
            <span className="inline-block bg-accent-yellow/20 text-accent-yellow text-xs px-3 py-1 rounded-full font-semibold mb-1 mr-2">Web</span>
            <span className={`text-base ${premium ? "text-white" : "text-gray-800"}`}>{resumenWeb.join(', ')}</span>
          </div>
        )}
      </div>

      {/* Precios */}
      <div className="my-4 flex flex-col gap-1">
        {precioMensual > 0 && (
          <div className={`text-lg font-semibold flex items-center gap-2 ${premium ? "text-accent-yellow" : "text-primary"}`}>
            <span>Precio mensual:</span>
            <span className="text-2xl font-bold font-serif">${precioMensual.toLocaleString()}</span>
          </div>
        )}
        {costoUnicos > 0 && (
          <div className={`text-base font-semibold flex items-center gap-2 ${premium ? "text-accent-orange" : "text-secondary"}`}>
            <span>Costo único:</span>
            <span className="text-lg font-bold">${costoUnicos.toLocaleString()}</span>
          </div>
        )}
      </div>

      {/* Bloques de ahorro independientes (sin total combinado) */}
      {(ahorroMensual > 0 || ahorroUnicos > 0) && (
        <div className="mb-4 space-y-2">
          {ahorroMensual > 0 && (
            <div
              className={`
                p-3 rounded-xl text-sm font-semibold shadow-sm border
                ${premium ? "bg-white/90 text-primary border-white/60" : "bg-green-100 text-green-800 border-green-200"}
              `}
            >
              {/* Emoji pedido */}
              <span className="mr-1" aria-hidden>🎉</span>
              ¡Estás ahorrando ${ahorroMensual.toLocaleString()} al mes!
            </div>
          )}
          {ahorroUnicos > 0 && (
            <div
              className={`
                p-3 rounded-xl text-sm font-semibold shadow-sm border
                ${premium ? "bg-white/90 text-primary border-white/60" : "bg-green-100 text-green-800 border-green-200"}
              `}
            >
              <span className="mr-1" aria-hidden>🎉</span>
              ¡Te ahorrás ${ahorroUnicos.toLocaleString()} en elementos de una vez!
            </div>
          )}
        </div>
      )}

      {/* Frases motivadoras */}
      <div className="mb-2">
        {phrases.map((frase, idx) => (
          <p key={idx} className={`text-sm italic ${premium ? "text-gray-200" : "text-gray-600"}`}>{frase}</p>
        ))}
      </div>

      {/* Botón principal */}
      <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className={`
          mt-4 ${premium ? "bg-accent-yellow text-black" : "bg-accent-yellow text-primary"}
          font-bold px-6 py-3 rounded-full w-full flex items-center justify-center gap-2 shadow-lg
          hover:bg-accent-blue hover:text-white transition-all duration-300 text-lg group
        `}
      >
        ¡Quiero este plan!
        <ArrowRightCircle className="ml-1 group-hover:translate-x-1 transition-transform duration-300" size={28} />
      </button>

      {/* Formulario emergente */}
      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4 animate-fade-in">
          <input
            type="text"
            name="nombre"
            required
            placeholder="Nombre"
            className={`w-full p-2 rounded border ${premium ? "text-black border-accent-yellow" : "text-primary border-primary"}`}
            value={formData.nombre}
            onChange={handleChange}
          />
          <input
            type="text"
            name="contacto"
            required
            placeholder="Mail o WhatsApp"
            className={`w-full p-2 rounded border ${premium ? "text-black border-accent-yellow" : "text-primary border-primary"}`}
            value={formData.contacto}
            onChange={handleChange}
          />
          <input
            type="text"
            name="redes"
            placeholder="Redes sociales (si ya tenés)"
            className={`w-full p-2 rounded border ${premium ? "text-black border-accent-yellow" : "text-primary border-primary"}`}
            value={formData.redes}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-accent-yellow text-primary font-bold px-6 py-2 rounded-full w-full hover:bg-accent-blue hover:text-white transition-all"
          >
            Enviar
          </button>
        </form>
      )}
    </div>
  );
}

