import servicios from '../data/services.json';

export function calcularNucleo({ posts = 0, reels = 0, historias = 0, moderacion = 0 }) {
  return (
    posts * servicios.publicacion.precio_unitario +
    reels * servicios.reel.precio_unitario +
    historias * servicios.historia.precio_unitario +
    moderacion * servicios.moderacion.precio_unitario
  );
}

export function calcularUnicos({ brandbook = 0, tarjetas = 0, folletos = 0 }) {
  return (
    brandbook * servicios.brandbook.precio_unitario +
    tarjetas * servicios.tarjetas.precio_unitario +
    folletos * servicios.folletos.precio_unitario
  );
}

export function calcularUnicosPaginas({ tiendanube = 0, pagina = 0 }) {
  return (
    tiendanube * servicios.tiendanube.precio_unitario +
    pagina * servicios.pagina.precio_unitario
  );
}

// NUEVA LÓGICA AJUSTADA:
export function calcularMensual(nucleo) {
  const fee = servicios.fee.precio_unitario;
  const a = servicios.limite_inferior.precio_unitario;
  const b = servicios.limite_medio.precio_unitario;
  const c = servicios.limite_superior.precio_unitario;

  const dMedio = 0.9; // -10%
  const dAlto  = 0.8; // -20%

  // 👇 nuevo: si no hay núcleo (no hay mensuales), NO hay fee mensual
  if (nucleo <= 0) return 0;

  if (nucleo <= a) {
    return fee + nucleo;
  }
  if (nucleo <= b) {
    return fee + a + (nucleo - a) * dMedio;
  }
  if (nucleo <= c) {
    return fee + a + (b - a) * dMedio + (nucleo - b) * dMedio;
  }
  return fee + a + (b - a) * dMedio + (c - b) * dMedio + (nucleo - c) * dAlto;
}


// Las demás funciones quedan igual.
export function aplicarDescuentoMensual(mensual, { tiendanube = 0, pagina = 0 }) {
  if (tiendanube + pagina === 0) return mensual;
  if (tiendanube === 1) return mensual * 0.9; // 10% descuento
  if (pagina === 1) return mensual * 0.8; // 20% descuento
  return mensual; // fallback sin descuento
}

export function calcularCostoUnicos(nucleo, mensualReal, unicos, unicosPaginas) {
  const limiteInferior = servicios.limite_inferior.precio_unitario;
  const limiteMedio = servicios.limite_medio.precio_unitario;
  const limiteSuperior = servicios.limite_superior.precio_unitario;

  if (mensualReal === 0 && unicosPaginas === 0) return unicos;
  if (mensualReal === 0 && unicosPaginas !== 0) return unicos * 0.8;

  if (nucleo < limiteInferior) return unicos * 0.8;
  if (nucleo >= limiteInferior && nucleo < limiteMedio) return unicos * 0.65;
  if (nucleo >= limiteMedio && nucleo < limiteSuperior) return unicos * 0.5;
  return unicos * 0.4;
}

