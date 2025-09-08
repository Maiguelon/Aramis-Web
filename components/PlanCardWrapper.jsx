// components/PlanCardWrapper.jsx
import React from 'react';
import PlanCard from './PlanCard';
import {
  calcularNucleo,
  calcularUnicos,
  calcularUnicosPaginas,
  calcularMensual,
  aplicarDescuentoMensual,
  calcularCostoUnicos
} from '../utils/PlanFunctions';
import { generarDescripcionPlan } from '../utils/PhrasesMaker';
import { getPlanColor } from '../utils/getPlanColor';
import servicios from '../data/services.json'; // 👉 para calcular el "sin escalas"

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

  // ----- Cálculos base -----
  const nucleo = calcularNucleo({ posts, reels, historias, moderacion });
  const unicos = calcularUnicos({ brandbook, tarjetas, folletos });
  const unicosPaginas = calcularUnicosPaginas({ pagina, tiendanube });

  // Mensual con ESCALAS (ya aplica dMedio / dAlto)
  const mensual = calcularMensual(nucleo);

  // Mensual con descuento por web (si corresponde)
  const mensualConDescuento = aplicarDescuentoMensual(mensual, { pagina, tiendanube });

  // Únicos con descuento según combos (NO incluye páginas)
  const unicosConDescuento = calcularCostoUnicos(
    nucleo,
    mensualConDescuento,
    unicos,
    unicosPaginas
  );

  // Costo final de únicos (descontado + páginas a precio lleno)
  const costoUnicos = unicosConDescuento + unicosPaginas;

  // ----- Frases y color -----
  const frases = tieneElementosSeleccionados()
    ? generarDescripcionPlan({ nucleo, unicos, pagina, tiendanube, brandbook, tarjetas, folletos })
    : [];

  const color = getPlanColor(selections);

  // ----- AHORROS (se muestran por separado) -----
  // 1) Ahorro mensual SOLO por escalas del núcleo (sin considerar descuento por web)
  const mensualSinEscalas = nucleo > 0 ? (servicios.fee.precio_unitario + nucleo) : 0;
  const ahorroMensual = Math.max(0, mensualSinEscalas - mensual);

  // 2) Ahorro en elementos ÚNICOS (lo que bajó por combos/umbral)
  const ahorroUnicos = Math.max(0, unicos - unicosConDescuento);

  return (
    <PlanCard
      precioMensual={tieneElementosSeleccionados() ? mensualConDescuento : 0}
      costoUnicos={tieneElementosSeleccionados() ? costoUnicos : 0}
      phrases={frases}
      selections={selections}
      color={color}
      // 👉 pasamos ahorros independientes (sin total combinado)
      ahorroMensual={ahorroMensual}
      ahorroUnicos={ahorroUnicos}
    />
  );
}


