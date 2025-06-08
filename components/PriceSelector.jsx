import React, { useState, useEffect } from 'react';
import { calcularNucleo, calcularUnicos, calcularUnicosPaginas, calcularMensual, aplicarDescuentoMensual, calcularCostoUnicos } from '../utils/PlanFunctions';

export default function PriceSelectorForm({ onChange }) {
  const [form, setForm] = useState({
    posts: 0,
    reels: 0,
    historias: 0,
    moderacion: 0,
    brandbook: 0,
    tarjetas: 0,
    folletos: 0,
    tiendanube: 0,
    pagina: 0,
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleSingleOption = (field) => {
    setForm(prev => ({ ...prev, tiendanube: 0, pagina: 0, [field]: prev[field] === 1 ? 0 : 1 }));
  };

  useEffect(() => {
    onChange(form);
  }, [form, onChange]);

  const nucleo = calcularNucleo(form);
  const unicos = calcularUnicos(form);
  const unicosPaginas = calcularUnicosPaginas(form);
  const mensual = calcularMensual(nucleo);
  const mensualConDescuento = aplicarDescuentoMensual(mensual, form);
  const unicosFinal = calcularCostoUnicos(nucleo, mensualConDescuento, unicos, unicosPaginas);
  const total = mensualConDescuento + unicosFinal + unicosPaginas;

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-center">Armá tu plan</h2>

      {/* Elementos mensuales */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Elementos mensuales</h3>
        {['posts', 'reels', 'historias', 'moderacion'].map((item) => (
          <div key={item} className="flex justify-between items-center mb-2">
            <label className="capitalize">{item}</label>
            <input
              type="number"
              min={0}
              step={item === 'reels' ? 1 : item === 'posts' ? 2 : 4}
              value={form[item]}
              onChange={(e) => handleChange(item, parseInt(e.target.value))}
              className="border rounded px-2 py-1 w-20 text-right"
            />
          </div>
        ))}
      </section>

      {/* Elementos únicos */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Elementos de una vez</h3>
        <div className="flex justify-between items-center mb-2">
          <label>Brandbook</label>
          <input
            type="checkbox"
            checked={form.brandbook === 1}
            onChange={() => handleChange('brandbook', form.brandbook === 1 ? 0 : 1)}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label>Tarjetas</label>
          <input
            type="checkbox"
            checked={form.tarjetas === 1}
            onChange={() => handleChange('tarjetas', form.tarjetas === 1 ? 0 : 1)}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label>Folletos</label>
          <input
            type="number"
            min={0}
            max={2}
            value={form.folletos}
            onChange={(e) => handleChange('folletos', parseInt(e.target.value))}
            className="border rounded px-2 py-1 w-20 text-right"
          />
        </div>
      </section>

      {/* Tu página web */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Tu página web</h3>
        <div className="flex justify-between items-center mb-2">
          <label>Tiendanube</label>
          <input
            type="checkbox"
            checked={form.tiendanube === 1}
            onChange={() => toggleSingleOption('tiendanube')}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label>Página personalizada</label>
          <input
            type="checkbox"
            checked={form.pagina === 1}
            onChange={() => toggleSingleOption('pagina')}
          />
        </div>
      </section>

      <div className="text-center mt-6">
        <p className="font-semibold">Total mensual estimado: ${mensualConDescuento.toFixed(2)}</p>
        <p className="font-semibold">Costo único estimado: ${(unicosFinal + unicosPaginas).toFixed(2)}</p>
        <p className="font-bold text-xl mt-2">Total estimado: ${total.toFixed(2)}</p>
      </div>
    </div>
  );
}