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

export default function PlanCardWrapper({ selections }) {
  const {
    posts = 0,
    reels = 0,
    historias = 0,
    moderacion = 0,
    brandbook = 0,
    tarjetas = 0,
    folletos = 0,
    pagina = 0,
    tiendanube = 0
  } = selections;

  // Calcular partes
  const nucleo = calcularNucleo({ posts, reels, historias, moderacion });
  const unicos = calcularUnicos({ brandbook, tarjetas, folletos });
  const unicosPaginas = calcularUnicosPaginas({ pagina, tiendanube });

  const mensual = calcularMensual(nucleo);
  const mensualConDescuento = aplicarDescuentoMensual(mensual, { pagina, tiendanube });
  const costoUnicos = calcularCostoUnicos(nucleo, mensualConDescuento, unicos, unicosPaginas) + unicosPaginas;

 const frases = generarDescripcionPlan({ nucleo, unicos, pagina, tiendanube, brandbook, tarjetas, folletos });

  return (
    <PlanCard
      precioMensual={mensualConDescuento}
      costoUnicos={costoUnicos}
      phrases={frases}
      selections={selections} // opcional
    />
  );
}
