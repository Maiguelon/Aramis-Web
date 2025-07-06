import React, { useState } from 'react';

export default function PlanCard({ precioMensual, costoUnicos, phrases, selections }) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    redes: ''
  });

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
        setMostrarFormulario(false);
        setFormData({ nombre: '', contacto: '', redes: '' });
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
        <h2 className="text-xl font-bold mb-2">Tu Plan</h2>
        <p className="text-gray-600">Aguardamos tus selecciones para armar tu plan personalizado.</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-2">Tu Plan</h2>
      <p className="font-semibold">Precio mensual: ${precioMensual.toLocaleString()}</p>
      <p className="font-semibold mb-2">Costo único: ${costoUnicos.toLocaleString()}</p>

      {phrases.map((frase, idx) => (
        <p key={idx} className="text-sm text-gray-700">{frase}</p>
      ))}

      <button
        onClick={() => setMostrarFormulario(!mostrarFormulario)}
        className="bg-black hover:bg-gray-800 text-white w-full py-2 rounded mt-4"
      >
        ¡Quiero este plan!
      </button>

      {enviado ? (
        <div className="mt-4 bg-green-500 text-white p-4 rounded-md text-center">
          ¡Gracias por enviar tu plan! Te vamos a contactar pronto.
        </div>
      ) : mostrarFormulario && (
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

    </div>
  );
}


