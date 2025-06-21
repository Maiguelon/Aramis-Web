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
    moderacion = false,
    brandbook = false,
    tarjetas = false,
    folletos = 0,
    pagina = false,
    tiendanube = false
  } = selections;

  const tieneElementosSeleccionados = () => {
    return (
      posts > 0 ||
      reels > 0 ||
      historias > 0 ||
      moderacion ||
      brandbook ||
      tarjetas ||
      folletos > 0 ||
      pagina ||
      tiendanube
    );
  };

  const nucleo = calcularNucleo({ posts, reels, historias, moderacion });
  const unicos = calcularUnicos({ brandbook, tarjetas, folletos });
  const unicosPaginas = calcularUnicosPaginas({ pagina, tiendanube });

  const mensual = calcularMensual(nucleo);
  const mensualConDescuento = aplicarDescuentoMensual(mensual, { pagina, tiendanube });
  const costoUnicos = calcularCostoUnicos(nucleo, mensualConDescuento, unicos, unicosPaginas) + unicosPaginas;

  const frases = tieneElementosSeleccionados()
    ? generarDescripcionPlan({ nucleo, unicos, pagina, tiendanube, brandbook, tarjetas, folletos })
    : [];

  return (
    <PlanCard
      precioMensual={tieneElementosSeleccionados() ? mensualConDescuento : 0}
      costoUnicos={tieneElementosSeleccionados() ? costoUnicos : 0}
      phrases={frases}
      selections={selections}
    />
  );
}
