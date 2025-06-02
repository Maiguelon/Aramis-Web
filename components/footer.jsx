import { useState } from "react";
import { FaWhatsapp, FaFacebook, FaInstagram } from "react-icons/fa";

export default function Footer() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      setEnviado(true);
      form.reset();
      setTimeout(() => setEnviado(false), 5000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10">
        {/* Contacto */}
        <div>
          <h2 className="text-xl font-bold mb-4">Contacto</h2>
          <p className="mb-2 flex items-center gap-2">
            <FaWhatsapp className="text-green-500" />
            +54 9 11 1234-5678
          </p>
          <p className="mb-2 flex items-center gap-2">
            <FaFacebook className="text-blue-500" />
            /aramis.marketing
          </p>
          <p className="mb-2 flex items-center gap-2">
            <FaInstagram className="text-pink-500" />
            @aramis.digital
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
            className="w-full p-2 rounded text-black"
          />
          <input
            type="email"
            name="email"
            required
            placeholder="Tu email"
            className="w-full p-2 rounded text-black"
          />
          <input
            type="text"
            name="redes"
            placeholder="Redes sociales (opcional)"
            className="w-full p-2 rounded text-black"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Enviar
          </button>

          {enviado && (
            <div className="mt-4 bg-green-500 text-white p-2 rounded-md">
              ¡Gracias! Te vamos a contactar pronto.
            </div>
          )}
        </form>
      </div>
    </footer>
  );
}
