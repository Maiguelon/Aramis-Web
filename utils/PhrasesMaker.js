import servicios from '../data/services.json';
import frases from '../data/phrases.json';

export function generarDescripcionPlan({ nucleo, brandbook = 0, tarjetas = 0, folletos = 0, tiendanube = 0, pagina = 0 }) {
  const limiteInferior = servicios.limite_inferior.precio_unitario;
  const limiteMedio = servicios.limite_medio.precio_unitario;
  const limiteSuperior = servicios.limite_superior.precio_unitario;

  // Núcleo
  let fraseNucleo = "";
  if (nucleo === 0) {
    fraseNucleo = frases.nucleo.nulo;
  } else if (nucleo < limiteInferior) {
    fraseNucleo = frases.nucleo.bajo;
  } else if (nucleo < limiteMedio) {
    fraseNucleo = frases.nucleo.medio;
  } else if (nucleo < limiteSuperior) {
    fraseNucleo = frases.nucleo.alto;
  } else {
    fraseNucleo = frases.nucleo.maximo;
  }

  // Únicos
  const tieneExtras = tarjetas > 0 || folletos > 0;
  let fraseUnicos = "";
  if (brandbook && tieneExtras) {
    fraseUnicos = frases.unicos.brandbook_extras;
  } else if (brandbook) {
    fraseUnicos = frases.unicos.brandbook;
  } else if (tieneExtras) {
    fraseUnicos = frases.unicos.extras;
  }

  // Páginas
  let frasePaginas = "";
  if (tiendanube) {
    frasePaginas = frases.paginas.tiendanube;
  } else if (pagina) {
    frasePaginas = frases.paginas.pagina;
  }

  // Composición con conectores
  const frasesSeleccionadas = [fraseNucleo, fraseUnicos, frasePaginas].filter(f => f && f.trim() !== "");
  const conectores = ["", "Además:", "Para cerrar:"];

  const resultado = frasesSeleccionadas.map((f, i) => {
    const conector = conectores[frasesSeleccionadas.length === 1 ? 0 : i];
    return conector ? `${conector} ${f}` : f;
  });

  return resultado;
}
