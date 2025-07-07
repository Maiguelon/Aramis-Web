export function getPlanColor(selections) {
  const {
    posts = 0, reels = 0, historias = 0, moderacion = false,
    brandbook = false, tarjetas = false, folletos = 0,
    pagina = false, tiendanube = false
  } = selections;

  const tieneMensuales = posts > 0 || reels > 0 || historias > 0 || moderacion;
  const tieneUnicos = brandbook || tarjetas || folletos > 0;
  const tieneWeb = pagina || tiendanube;

  // Combo total (todo activado)
  if (tieneMensuales && tieneUnicos && tieneWeb) return 'combo_total';

  if (tieneMensuales && !tieneUnicos && !tieneWeb) return 'mensual';           // solo redes
  if (tieneUnicos && !tieneMensuales && !tieneWeb) return 'unicos';            // solo gráficos
  if (tieneWeb && !tieneMensuales && !tieneUnicos) return 'web';               // solo web
  if (tieneMensuales && tieneWeb && !tieneUnicos) return 'mensual_web';        // redes + web
  if (tieneUnicos && tieneWeb && !tieneMensuales) return 'unicos_web';         // gráficos + web

  return 'primary'; // fallback
}
