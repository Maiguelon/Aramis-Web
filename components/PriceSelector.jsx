// components/PriceSelector.jsx
import React, { useState, useEffect } from 'react';

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

  // Cambia estilos de inputs y agrega microanimaciones/focus
  const baseInput =
    "border rounded-xl px-3 py-2 w-20 text-right shadow focus:ring-2 focus:ring-accent-yellow focus:border-accent-yellow transition-all";
  const baseLabel =
    "font-semibold text-primary hover:text-accent-blue transition-all duration-200 cursor-pointer";
  const baseSection =
    "bg-bg-light/60 p-4 rounded-2xl mb-4 shadow-inner border border-accent-yellow/10";

  const handleChange = (field, value) => {
    setForm(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleSingleOption = (field) => {
    setForm(prev => ({
      ...prev,
      tiendanube: false,
      pagina: false,
      [field]: !prev[field],
    }));
  };

  useEffect(() => {
    onChange(form);
  }, [form, onChange]);

  return (
    <form className="space-y-6">
      {/* Elementos mensuales */}
      <section className={baseSection}>
        <h3 className="text-lg font-serif font-bold mb-3 text-secondary">Elementos mensuales</h3>
        <div className="flex justify-between items-center mb-2">
          <label className={baseLabel}>Posts</label>
          <input
            type="number"
            min={0}
            max={12}
            step={2}
            value={form.posts}
            onChange={(e) => handleChange('posts', Math.max(0, Math.min(12, parseInt(e.target.value) || 0)))}
            className={baseInput}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className={baseLabel}>Reels</label>
          <input
            type="number"
            min={0}
            max={6}
            step={1}
            value={form.reels}
            onChange={(e) => handleChange('reels', Math.max(0, Math.min(6, parseInt(e.target.value) || 0)))}
            className={baseInput}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className={baseLabel}>Historias</label>
          <input
            type="number"
            min={0}
            max={20}
            step={4}
            value={form.historias}
            onChange={(e) => handleChange('historias', Math.max(0, Math.min(20, parseInt(e.target.value) || 0)))}
            className={baseInput}
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className={baseLabel}>Moderación</label>
          <input
            type="checkbox"
            checked={form.moderacion}
            onChange={() => handleChange('moderacion', !form.moderacion)}
            className="accent-accent-yellow w-5 h-5"
          />
        </div>
      </section>

      {/* Elementos únicos */}
      <section className={baseSection}>
        <h3 className="text-lg font-serif font-bold mb-3 text-secondary">Elementos de una vez</h3>
        <div className="flex justify-between items-center mb-2">
          <label className={baseLabel}>Brandbook</label>
          <input
            type="checkbox"
            checked={form.brandbook}
            onChange={() => handleChange('brandbook', !form.brandbook)}
            className="accent-accent-blue w-5 h-5"
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className={baseLabel}>Tarjetas</label>
          <input
            type="checkbox"
            checked={form.tarjetas}
            onChange={() => handleChange('tarjetas', !form.tarjetas)}
            className="accent-secondary w-5 h-5"
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className={baseLabel}>Folletos</label>
          <input
            type="number"
            min={0}
            max={2}
            step={1}
            value={form.folletos}
            onChange={(e) => handleChange('folletos', Math.max(0, Math.min(2, parseInt(e.target.value) || 0)))}
            className={baseInput}
          />
        </div>
      </section>

      {/* Página web */}
      <section className={baseSection}>
        <h3 className="text-lg font-serif font-bold mb-3 text-accent-blue">Tu página web</h3>
        <div className="flex justify-between items-center mb-2">
          <label className={baseLabel}>Tiendanube</label>
          <input
            type="checkbox"
            checked={form.tiendanube}
            onChange={() => toggleSingleOption('tiendanube')}
            className="accent-accent-yellow w-5 h-5"
          />
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className={baseLabel}>Página personalizada</label>
          <input
            type="checkbox"
            checked={form.pagina}
            onChange={() => toggleSingleOption('pagina')}
            className="accent-accent-yellow w-5 h-5"
          />
        </div>
      </section>
    </form>
  );
}



