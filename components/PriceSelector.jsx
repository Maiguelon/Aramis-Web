import React, { useState, useEffect } from 'react';
import Tooltip from './Tooltip';

function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
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
    ads: false,
    brandbook: false,
    tarjetas: false,
    folletos: 0,
    tiendanube: false,
    pagina: false,
  });

  const isMobile = useIsMobile();

  const baseInput =
    "text-primary border rounded-xl px-3 py-2 w-20 text-right shadow focus:ring-2 focus:ring-accent-yellow focus:border-accent-yellow transition-all";
  const baseLabel =
    "font-semibold text-primary transition-all duration-200 cursor-default flex items-center";
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
        <div className="mb-4">
          <div className="flex items-center">
            <h3 className="text-lg font-serif font-bold text-secondary">Elementos mensuales</h3>
            <Tooltip text="Gestión mes a mes. Consultá por descuentos trimestrales." />
          </div>
          {/* AVISO DE HISTORIAS BONIFICADAS */}
          <p className="text-xs text-accent-blue font-bold mt-1 uppercase tracking-wide">
            ✨ Incluye historias bonificadas con tus posts y reels
          </p>
        </div>
        
        <div className="flex justify-between items-center mb-2">
          <label className={baseLabel}>
            Posts
            {/* CORREGIDO: Saqué la redundancia de la historia */}
            {/*<Tooltip text="Diseño y redacción de posteos estáticos o carruseles." />*/}
          </label>
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
          <label className={baseLabel}>
            Reels
            {/* CORREGIDO: Volvimos al texto de calidad de producción */}
            <Tooltip text="Grabación con luces y micrófonos, edición profesional y guionado." />
          </label>
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

        {/* META ADS */}
        <div className="flex justify-between items-center mb-2 pt-2 border-t border-gray-200/50">
          <label className={baseLabel}>
            Gestión Meta Ads
            <Tooltip text="Configuración y optimización de campañas publicitarias (no incluye inversión publicitaria)." />
          </label>
          <input
            type="checkbox"
            checked={form.ads}
            onChange={() => handleChange('ads', !form.ads)}
            className="accent-accent-yellow w-5 h-5"
          />
        </div>
      </section>

      {/* Elementos únicos */}
      <section className={baseSection}>
        <div className="flex items-center mb-3">
          <h3 className="text-lg font-serif font-bold text-secondary">Elementos de una vez</h3>
          <Tooltip text="Inversión única. Son desarrollos que quedan para tu marca." />
        </div>

        <div className="flex justify-between items-center mb-2">
          <label className={baseLabel}>
            Brandbook
            <Tooltip text="Identidad visual completa: Logo, paleta, fuentes." />
          </label>
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
        <div className="flex items-center mb-3">
          <h3 className="text-lg font-serif font-bold text-accent-blue">Tu página web</h3>
          <Tooltip text="El costo de mantenimiento mensual se cotiza aparte." />
        </div>

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