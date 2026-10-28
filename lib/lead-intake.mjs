const UTM_FIELDS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

/** Only commercial context crosses into the iframe URL. Never forward arbitrary query parameters. */
export function tallyEmbedUrl(formId, { pageUrl, sourceForm = 'footer', title = '', selections } = {}) {
  if (!/^[A-Za-z0-9_-]{3,80}$/.test(formId || '')) return null;
  const url = new URL(`https://tally.so/embed/${formId}`);
  url.searchParams.set('alignLeft', '1');
  url.searchParams.set('hideTitle', '1');
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
  if (title) url.searchParams.set('plan_title', String(title).slice(0, 160));
  if (selections && typeof selections === 'object') {
    const clean = {};
    for (const key of ['posts', 'reels', 'folletos']) {
      if (Number.isInteger(selections[key]) && selections[key] >= 0 && selections[key] <= 100) clean[key] = selections[key];
    }
    for (const key of ['ads', 'brandbook', 'tarjetas', 'tiendanube', 'pagina']) {
      if (typeof selections[key] === 'boolean') clean[key] = selections[key];
    }
    url.searchParams.set('plan', JSON.stringify({ selections: clean }));
  }
  return url.href;
}

export const CONTACT_CONSENT = 'Autorizo a Aramis a gestionar los datos de esta consulta y contactarme para responderla. Puedo solicitar acceso o eliminación en hola@aramis.agency. No me suscribe a campañas.';

/** Ignore messages from other sites or another copy of the same form. Never retain answers. */
export function isTallySubmissionMessage(event, frameWindow, formId) {
  if (!frameWindow || event.origin !== 'https://tally.so' || event.source !== frameWindow) return false;
  let message = event.data;
  if (typeof message === 'string') {
    if (message.length > 100000) return false;
    try { message = JSON.parse(message); } catch { return false; }
  }
  return message?.event === 'Tally.FormSubmitted' && message.payload?.formId === formId
    && typeof message.payload?.id === 'string' && /^[A-Za-z0-9_-]{3,100}$/.test(message.payload.id);
}
