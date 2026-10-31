const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

/** Display copy is derived from the same permitted choices sent to LeadOps, never from URL text or prices. */
export function planSummary(selections = {}) {
  const items = [];
  for (const [key, singular, plural] of [['posts', 'post', 'posts'], ['reels', 'reel', 'reels']]) {
    const count = selections[key];
    if (Number.isInteger(count) && count > 0 && count <= 100) items.push(`${count} ${count === 1 ? singular : plural} por mes`);
  }
  if (items.length) items.push('Historias bonificadas');
  if (selections.ads === true) items.push('Gestión de Meta Ads');
  if (selections.brandbook === true) items.push('Brandbook');
  if (selections.tarjetas === true) items.push('Tarjetas');
  const flyers = selections.folletos;
  if (Number.isInteger(flyers) && flyers > 0 && flyers <= 100) items.push(`${flyers} ${flyers === 1 ? 'folleto' : 'folletos'}`);
  if (selections.tiendanube === true) items.push('Tiendanube');
  if (selections.pagina === true) items.push('Página personalizada');
  return items.join(' · ');
}

/** Only commercial context crosses into the form URL. Never forward arbitrary query parameters. */
export function tallyFormUrl(formId, { pageUrl, sourceForm = 'footer', title = '', selections } = {}) {
  if (!/^[A-Za-z0-9_-]{3,80}$/.test(formId || '')) return null;
  const url = new URL(`https://tally.so/r/${formId}`);
  url.searchParams.set('source_form', sourceForm === 'plan_card' ? 'plan_card' : 'footer');
  if (pageUrl) {
    try {
      const page = new URL(pageUrl);
      if (['https:', 'http:'].includes(page.protocol)) {
        url.searchParams.set('source_url', `${page.origin}${page.pathname}`.slice(0, 500));
        for (const key of UTM_FIELDS) {
          const value = page.searchParams.get(key);
          if (value) url.searchParams.set(key, value.slice(0, 120));
        }
      }
    } catch { /* A missing source must not block the contact form. */ }
  }
  if (selections && typeof selections === 'object') {
    const clean = {};
    for (const key of ['posts', 'reels', 'folletos']) {
      if (Number.isInteger(selections[key]) && selections[key] >= 0 && selections[key] <= 100) clean[key] = selections[key];
    }
    for (const key of ['ads', 'brandbook', 'tarjetas', 'tiendanube', 'pagina']) {
      if (typeof selections[key] === 'boolean') clean[key] = selections[key];
    }
    url.searchParams.set('plan', JSON.stringify({ selections: clean }));
    const summary = sourceForm === 'plan_card' ? planSummary(clean) : '';
    if (summary) {
      const label = String(title || '').replace(/[<>\u0000-\u001f\u007f]/g, '').trim().slice(0, 160);
      url.searchParams.set('plan_title', label || 'Tu plan personalizado');
      url.searchParams.set('plan_summary', summary);
    }
  }
  return url.href;
}

export const CONTACT_CONSENT = 'Autorizo a Aramis a gestionar los datos de esta consulta y contactarme para responderla. Puedo solicitar acceso o eliminación en hola@aramis.agency. No me suscribe a campañas.';
