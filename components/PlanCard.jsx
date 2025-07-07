import React, { useState, useEffect } from 'react';

export default function PlanCard({ titulo = "Tu Plan", precioMensual, costoUnicos, phrases, selections }) {
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
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setEnviado(true);
        setEnviadoBanda(true);
        setMostrarFormulario(false);
        setFormData({ nombre: '', contacto: '', redes: '' });
        // Oculta el mensaje grande a los 4 segundos, pero deja la banda
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

  if (!hayContenido) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-2">{titulo}</h2>
        <p className="text-gray-600">Aguardamos tus selecciones para armar tu plan personalizado.</p>
      </div>
    );
  }

  // Clasificar ítems según tipo

  // Mensuales
  const resumenMensual = [];
  if (selections.posts > 0) resumenMensual.push(`${selections.posts} post${selections.posts > 1 ? 's' : ''}`);
  if (selections.reels > 0) resumenMensual.push(`${selections.reels} reel${selections.reels > 1 ? 's' : ''}`);
  if (selections.historias > 0) resumenMensual.push(`${selections.historias} historia${selections.historias > 1 ? 's' : ''}`);
  if (selections.moderacion) resumenMensual.push("moderación");

  // Únicos
  const resumenUnicos = [];
  if (selections.brandbook) resumenUnicos.push("Brandbook");
  if (selections.tarjetas) resumenUnicos.push("tarjeta");
  if (selections.folletos > 0) resumenUnicos.push(`${selections.folletos} folleto${selections.folletos > 1 ? 's' : ''}`);

  // Web
  const resumenWeb = [];
  if (selections.tiendanube) resumenWeb.push("Tiendanube");
  if (selections.pagina) resumenWeb.push("Página personalizada");

  // Return
  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">{titulo}</h2>
      {/* Bloques claros de resumen */}
      {resumenMensual.length > 0 && (
        <div className="mb-2">
          <div className="text-sm font-semibold text-gray-700">Lo que vas a recibir cada mes:</div>
          <div className="text-base text-gray-900">{resumenMensual.join(', ')}</div>
        </div>
      )}
      {resumenUnicos.length > 0 && (
        <div className="mb-2">
          <div className="text-sm font-semibold text-gray-700">Extras únicos:</div>
          <div className="text-base text-gray-900">{resumenUnicos.join(', ')}</div>
        </div>
      )}
      {resumenWeb.length > 0 && (
        <div className="mb-2">
          <div className="text-sm font-semibold text-gray-700">Tu página web:</div>
          <div className="text-base text-gray-900">{resumenWeb.join(', ')}</div>
        </div>
      )}


      {precioMensual > 0 && (
        <p className="font-semibold">Precio mensual: ${precioMensual.toLocaleString()}</p>
      )}
      {costoUnicos > 0 && (
        <p className="font-semibold mb-2">Costo único: ${costoUnicos.toLocaleString()}</p>
      )}


      {phrases.map((frase, idx) => (
        <p key={idx} className="text-sm text-gray-700">{frase}</p>
      ))}

      <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className="bg-black hover:bg-gray-800 text-white w-full py-2 rounded mt-4"
      >
        ¡Quiero este plan!
      </button>

      {mostrarFormulario && (
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <input
            type="text"
            name="nombre"
            required
            placeholder="Nombre"
            className="w-full p-2 rounded text-black"
          />
          <input
            type="text"
            name="contacto"
            required
            placeholder="Mail o WhatsApp"
            className="w-full p-2 rounded text-black"
          />
          <input
            type="text"
            name="redes"
            placeholder="Redes sociales (si ya tenés)"
            className="w-full p-2 rounded text-black"
          />

          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md w-full"
          >
            Enviar plan
          </button>
        </form>
      )}
      {
        enviado && (
          <div className="mt-4 bg-green-500 text-white p-2 rounded-md text-center text-base font-semibold transition-all">
            ¡Gracias por enviar tu plan! Te vamos a contactar pronto.
          </div>
        )
      }

      {
        enviadoBanda && !enviado && (
          <div className="w-full border-b-4 border-green-500 text-green-700 text-xs text-center pb-1">
            Plan enviado correctamente
          </div>
        )
      }
    </div>
  );
}


