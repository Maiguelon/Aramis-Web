import React, { useState, useEffect } from 'react';
import {
  calcularNucleo,
  calcularUnicos,
  calcularUnicosPaginas,
  calcularMensual,
  aplicarDescuentoMensual,
  calcularCostoUnicos,
} from '../utils/PlanFunctions';

export default function PriceSelectorForm({ onChange }) {
  const [form, setForm] = useState({
    posts: 0,
    reels: 0,
    historias: 0,
    moderacion: false,
    brandbook: false,
    tarjetas: false,
    folletos: 0,
    tiendanube: false,
    pagina: false,
  });

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const toggleSingleOption = (field) => {
    setForm(prev => ({
      ...prev,
      tiendanube: false,
      pagina: false,
      [field]: !prev[field],
    }));
  };

  const tieneElementosSeleccionados = () => {
    const { posts, reels, historias, moderacion, brandbook, tarjetas, folletos, tiendanube, pagina } = form;
    return (
      posts > 0 ||
      reels > 0 ||
      historias > 0 ||
      moderacion ||
      brandbook ||
      tarjetas ||
      folletos > 0 ||
      tiendanube ||
      pagina
    );
  };

  useEffect(() => {
    onChange(form);
  }, [form, onChange]);

  // Cálculos
  const nucleo = calcularNucleo(form);
  const unicos = calcularUnicos(form);
  const unicosPaginas = calcularUnicosPaginas(form);
  const mensual = calcularMensual(nucleo);
  const mensualConDescuento = aplicarDescuentoMensual(mensual, form);
  const unicosFinal = calcularCostoUnicos(nucleo, mensualConDescuento, unicos, unicosPaginas);

  return (
    <div className="p-6 space-y-6 bg-white rounded-xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-center">Armá tu plan</h2>

      {/* Elementos mensuales */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Elementos mensuales</h3>
        {['posts', 'reels', 'historias'].map((item) => (
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
        <div className="flex justify-between items-center mb-2">
          <label>Moderación</label>
          <input
            type="checkbox"
            checked={form.moderacion}
            onChange={() => handleChange('moderacion', !form.moderacion)}
          />
        </div>
      </section>

      {/* Elementos únicos */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Elementos de una vez</h3>
        <div className="flex justify-between items-center mb-2">
          <label>Brandbook</label>
          <input
            type="checkbox"
            checked={form.brandbook}
            onChange={() => handleChange('brandbook', !form.brandbook)}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label>Tarjetas</label>
          <input
            type="checkbox"
            checked={form.tarjetas}
            onChange={() => handleChange('tarjetas', !form.tarjetas)}
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

      {/* Página web */}
      <section>
        <h3 className="text-lg font-semibold mb-2">Tu página web</h3>
        <div className="flex justify-between items-center mb-2">
          <label>Tiendanube</label>
          <input
            type="checkbox"
            checked={form.tiendanube}
            onChange={() => toggleSingleOption('tiendanube')}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label>Página personalizada</label>
          <input
            type="checkbox"
            checked={form.pagina}
            onChange={() => toggleSingleOption('pagina')}
          />
        </div>
      </section>

      {/* Resultados (solo si se seleccionó algo) */}
      {tieneElementosSeleccionados() && (
        <div className="text-center mt-6 space-y-1">
          {mensualConDescuento > 0 && (
            <p className="font-semibold">
              Total mensual estimado: ${mensualConDescuento.toFixed(2)}
            </p>
          )}
          {(unicosFinal > 0 || unicosPaginas > 0) && (
            <p className="font-semibold">
              Costo único estimado: ${(unicosFinal + unicosPaginas).toFixed(2)}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
