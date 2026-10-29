import { useEffect, useId, useState } from 'react';
import { tallyFormUrl } from '../lib/lead-intake.mjs';

export const TALLY_FORM_ID = process.env.NEXT_PUBLIC_LEADOPS_TALLY_FORM_ID || '';
export const TALLY_ENABLED = /^[A-Za-z0-9_-]{3,80}$/.test(TALLY_FORM_ID);

export default function TallyLeadLink({ sourceForm = 'footer', title, selections, children,
  className = 'inline-flex items-center justify-center rounded-full bg-accent-yellow px-6 py-3 font-bold text-primary shadow-lg transition hover:bg-bg-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent-yellow' }) {
  const [pageUrl, setPageUrl] = useState('');
  const descriptionId = useId();
  useEffect(() => { setPageUrl(window.location.href); }, [sourceForm]);
  const href = tallyFormUrl(TALLY_FORM_ID, { pageUrl, sourceForm, title, selections });
  if (!href) return null;
  return (
    <div>
      <a href={href} target="_blank" rel="noopener noreferrer" aria-describedby={descriptionId} className={className}>
        {children || 'Contanos tu proyecto'}
      </a>
      <p id={descriptionId} className="mt-2 text-sm font-normal opacity-80">Se abre un formulario en otra pestaña.</p>
    </div>
  );
}
