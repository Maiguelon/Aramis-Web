// components/PlanCardWrapper.jsx
import React from 'react';
import PlanCard from './PlanCard';
import {
  calcularNucleo,
  calcularUnicos,
  calcularUnicosPaginas,
  calcularMensual,
  calcularCostoUnicos
} from '../utils/PlanFunctions';
import { generarDescripcionPlan } from '../utils/PhrasesMaker';
import { getPlanColor } from '../utils/getPlanColor';
import servicios from '../data/services.json'; 

export default function PlanCardWrapper({ selections }) {
  const {
    posts = 0,
    reels = 0,
    historias = 0,
    moderacion = false,
    brandbook = false,
    tarjetas = false,
    folletos = 0,
    pagina = false,
    tiendanube = false
  } = selections;

  const tieneElementosSeleccionados = () =>
    posts > 0 ||
    reels > 0 ||
    historias > 0 ||
    moderacion ||
    brandbook ||
    tarjetas ||
    folletos > 0 ||
    pagina ||
    tiendanube;

  // ----- A. CÁLCULOS ARAMIS -----
  const nucleo = calcularNucleo({ posts, reels, historias, moderacion });
  const unicos = calcularUnicos({ brandbook, tarjetas, folletos });
  const unicosPaginas = calcularUnicosPaginas({ pagina, tiendanube });

  // 1. Mensual (Escalas + Fee) -> SIN descuentos extra por web
  const mensualAramis = calcularMensual(nucleo);

  // 2. Únicos (Brandbook, etc) -> Aplicamos descuento por volumen de nucleo si corresponde
  const unicosConDescuento = calcularCostoUnicos(nucleo, unicos);

  // 3. Total Únicos (Gráfica con descuento + Web a precio de lista)
  const costoUnicosAramis = unicosConDescuento + unicosPaginas;


  // ----- B. CÁLCULOS MERCADO (Comparativa) -----
  const mercado = servicios.mercado || {}; // fallback por si no cargó el json nuevo aún

  const mercadoMensual = 
    (posts * (mercado.post || 0)) +
    (reels * (mercado.reel || 0)) +
    (historias * (mercado.historia || 0)) +
    (moderacion ? (mercado.moderacion || 0) : 0);

  const mercadoUnicos =
    (brandbook ? (mercado.brandbook || 0) : 0) +
    (tarjetas ? (mercado.tarjetas || 0) : 0) +
    (folletos * (mercado.folletos || 0)) +
    (pagina ? (mercado.pagina || 0) : 0) +
    (tiendanube ? (mercado.tiendanube || 0) : 0);


  // ----- C. AHORRO -----
  const ahorroMensual = Math.max(0, mercadoMensual - mensualAramis);
  const ahorroUnicos = Math.max(0, mercadoUnicos - costoUnicosAramis);

  // ----- D. TEXTOS Y COLORES -----
  const frases = tieneElementosSeleccionados()
    ? generarDescripcionPlan({ nucleo, unicos, pagina, tiendanube, brandbook, tarjetas, folletos })
    : [];

  const color = getPlanColor(selections);

  return (
    <PlanCard
      precioMensual={tieneElementosSeleccionados() ? mensualAramis : 0}
      costoUnicos={tieneElementosSeleccionados() ? costoUnicosAramis : 0}
      phrases={frases}
      selections={selections}
      color={color}
      ahorroMensual={ahorroMensual}
      ahorroUnicos={ahorroUnicos}
    />
  );
}

