import servicios from '../data/services.json';

export function calcularNucleo({ posts = 0, reels = 0, historias = 0, moderacion = 0 }) {
  // Checkeos de seguridad por si algún valor viene undefined
  const pPost = servicios.publicacion ? servicios.publicacion.precio_unitario : 0;
  const pReel = servicios.reel ? servicios.reel.precio_unitario : 0;
  const pHistoria = servicios.historia ? servicios.historia.precio_unitario : 0;
  const pMod = servicios.moderacion ? servicios.moderacion.precio_unitario : 0;

  return (
    posts * pPost +
    reels * pReel +
    historias * pHistoria +
    (moderacion ? pMod : 0)
  );
}

export function calcularUnicos({ brandbook = 0, tarjetas = 0, folletos = 0 }) {
  const pBrand = servicios.brandbook ? servicios.brandbook.precio_unitario : 0;
  const pTarj = servicios.tarjetas ? servicios.tarjetas.precio_unitario : 0;
  const pFoll = servicios.folletos ? servicios.folletos.precio_unitario : 0;

  return (
    (brandbook ? pBrand : 0) +
    (tarjetas ? pTarj : 0) +
    folletos * pFoll
  );
}

export function calcularUnicosPaginas({ tiendanube = 0, pagina = 0 }) {
  const pTienda = servicios.tiendanube ? servicios.tiendanube.precio_unitario : 0;
  const pWeb = servicios.pagina ? servicios.pagina.precio_unitario : 0;

  return (
    (tiendanube ? pTienda : 0) +
    (pagina ? pWeb : 0)
  );
}

export function calcularMensual(nucleo) {
  const fee = servicios.fee.precio_unitario;
  const a = servicios.limite_inferior.precio_unitario;
  const b = servicios.limite_medio.precio_unitario;
  const c = servicios.limite_superior.precio_unitario;

  const dMedio = 0.9; // -10% descuento marginal
  const dAlto  = 0.8; // -20% descuento marginal

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
  // Si supera el límite superior, todo lo extra va con dAlto
  return fee + a + (b - a) * dMedio + (c - b) * dMedio + (nucleo - c) * dAlto;
}

// Lógica simplificada: A mayor plan mensual, más descuento en Brandbook/Tarjetas
export function calcularCostoUnicos(nucleo, unicos) {
  const limiteInferior = servicios.limite_inferior.precio_unitario;
  const limiteMedio = servicios.limite_medio.precio_unitario;
  const limiteSuperior = servicios.limite_superior.precio_unitario;

  // Si no hay plan mensual (nucleo 0), se cobra precio lleno de unicos
  if (nucleo === 0) return unicos;

  if (nucleo < limiteInferior) return unicos * 0.90; // 10% off
  if (nucleo >= limiteInferior && nucleo < limiteMedio) return unicos * 0.80; // 20% off
  if (nucleo >= limiteMedio && nucleo < limiteSuperior) return unicos * 0.70; // 30% off
  return unicos * 0.60; // 40% off para planes gigantes
}
