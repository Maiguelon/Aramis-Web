import { useEffect, useMemo, useState } from 'react';
import { tallyEmbedUrl } from '../lib/lead-intake.mjs';

export const TALLY_FORM_ID = process.env.NEXT_PUBLIC_LEADOPS_TALLY_FORM_ID || '';
export const TALLY_ENABLED = /^[A-Za-z0-9_-]{3,80}$/.test(TALLY_FORM_ID);

export default function TallyLeadForm({ sourceForm = 'footer', title, selections }) {
  const [pageUrl, setPageUrl] = useState('');
  useEffect(() => { setPageUrl(window.location.href); }, [sourceForm]);
  const src = useMemo(() => tallyEmbedUrl(TALLY_FORM_ID, { pageUrl, sourceForm, title, selections }),
    [pageUrl, sourceForm, title, selections]);
  if (!src || !pageUrl) return <p role="status">Preparando formulario…</p>;
  return (
    <div className="rounded-xl bg-white p-3 text-primary mt-4">
      <iframe src={src} title={sourceForm === 'plan_card' ? 'Consulta sobre tu plan de Aramis' : 'Contacto con Aramis'}
        width="100%" height="1160" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"
        className="w-full border-0 rounded-lg" style={{ minHeight: '1160px' }} />
      <p className="text-sm px-2 pb-3">
        Si no ves el formulario, <a href={src} target="_blank" rel="noopener noreferrer" className="underline font-semibold">abrilo en otra pestaña</a>.
      </p>
    </div>
  );
}
