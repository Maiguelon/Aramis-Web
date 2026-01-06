import servicios from '../data/services.json';

export function calcularNucleo({ posts = 0, reels = 0, ads = false }) {
  // Checkeos de seguridad por si algún valor viene undefined en el JSON
  const pPost = servicios.publicacion ? servicios.publicacion.precio_unitario : 0;
  const pReel = servicios.reel ? servicios.reel.precio_unitario : 0;
  
  // CORRECCIÓN: Ahora leemos el precio desde el JSON en lugar de usar 60000 fijo.
  const pAds = servicios.ads ? servicios.ads.precio_unitario : 0;

  return (
    posts * pPost +
    reels * pReel +
    (ads ? pAds : 0)
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
  // Si en tu JSON borraste 'fee', asegúrate de que esto no rompa.
  // Pero asumo que el 'fee' sigue estando en el JSON (es el costo base de agencia).
  const fee = servicios.fee ? servicios.fee.precio_unitario : 0;
  
  const a = servicios.limite_inferior.precio_unitario;
  const b = servicios.limite_medio.precio_unitario;
  const c = servicios.limite_superior.precio_unitario;

  const dMedio = 0.9; 
  const dAlto  = 0.8; 

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

export function calcularCostoUnicos(nucleo, unicos) {
  const limiteInferior = servicios.limite_inferior.precio_unitario;
  const limiteMedio = servicios.limite_medio.precio_unitario;
  const limiteSuperior = servicios.limite_superior.precio_unitario;

  if (nucleo === 0) return unicos;

  if (nucleo < limiteInferior) return unicos * 0.90; 
  if (nucleo >= limiteInferior && nucleo < limiteMedio) return unicos * 0.80; 
  if (nucleo >= limiteMedio && nucleo < limiteSuperior) return unicos * 0.70; 
  return unicos * 0.60; 
}
