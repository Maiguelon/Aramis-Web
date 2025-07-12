import React, { useState, useEffect } from 'react';

// Hook para detectar si es mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640); // sm=640px
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return isMobile;
}

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

  const isMobile = useIsMobile();

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
          {isMobile ? (
            <select
              value={form.posts}
              onChange={(e) => handleChange('posts', Number(e.target.value))}
              className={baseInput + " pr-7"}
            >
              {[0, 2, 4, 6, 8, 10, 12].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          ) : (
            <input
              type="number"
              min={0}
              max={12}
              step={2}
              value={form.posts}
              onChange={(e) => handleChange('posts', Math.max(0, Math.min(12, parseInt(e.target.value) || 0)))}
              className={baseInput}
            />
          )}
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className={baseLabel}>Reels</label>
          {isMobile ? (
            <select
              value={form.reels}
              onChange={(e) => handleChange('reels', Number(e.target.value))}
              className={baseInput + " pr-7"}
            >
              {[0, 1, 2, 3, 4, 5, 6].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          ) : (
            <input
              type="number"
              min={0}
              max={6}
              step={1}
              value={form.reels}
              onChange={(e) => handleChange('reels', Math.max(0, Math.min(6, parseInt(e.target.value) || 0)))}
              className={baseInput}
            />
          )}
        </div>
        <div className="flex justify-between items-center mb-2">
          <label className={baseLabel}>Historias</label>
          {isMobile ? (
            <select
              value={form.historias}
              onChange={(e) => handleChange('historias', Number(e.target.value))}
              className={baseInput + " pr-7"}
            >
              {[0, 4, 8, 12, 16, 20].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          ) : (
            <input
              type="number"
              min={0}
              max={20}
              step={4}
              value={form.historias}
              onChange={(e) => handleChange('historias', Math.max(0, Math.min(20, parseInt(e.target.value) || 0)))}
              className={baseInput}
            />
          )}
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
          {isMobile ? (
            <select
              value={form.folletos}
              onChange={(e) => handleChange('folletos', Number(e.target.value))}
              className={baseInput + " pr-7"}
            >
              {[0, 1, 2].map(n => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          ) : (
            <input
              type="number"
              min={0}
              max={2}
              step={1}
              value={form.folletos}
              onChange={(e) => handleChange('folletos', Math.max(0, Math.min(2, parseInt(e.target.value) || 0)))}
              className={baseInput}
            />
          )}
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
