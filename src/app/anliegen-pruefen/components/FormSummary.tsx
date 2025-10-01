"use client";
import React, { useEffect, useState } from 'react';
import './FormSummary.css';

type Props = {
  formData: any;
  onEdit: (step: number) => void;
};

export default function FormSummary({ formData, onEdit }: Props) {
  const [previews, setPreviews] = useState<Record<string, string | string[]>>({});

  useEffect(() => {
    const urls: Record<string, string | string[]> = {};
    try {
      const images = formData?.bilder ?? {};
      Object.keys(images).forEach((k) => {
        const v = (images as any)[k];
        if (Array.isArray(v)) {
          const arr = v.map((f: File) => (typeof window !== 'undefined' && f instanceof File ? URL.createObjectURL(f) : '')).filter(Boolean);
          if (arr.length) urls[k] = arr;
        } else if (v instanceof File) {
          const u = typeof window !== 'undefined' ? URL.createObjectURL(v) : '';
          if (u) urls[k] = u;
        }
      });

      if (formData?.zusatzDokumente && Array.isArray(formData.zusatzDokumente)) {
        const extras = formData.zusatzDokumente.map((f: File) => (typeof window !== 'undefined' && f instanceof File ? URL.createObjectURL(f) : '')).filter(Boolean);
        if (extras.length) urls.zusatzDokumente = extras;
      }
    } catch (e) {
      // ignore
    }
    setPreviews(urls);

    return () => {
      // revoke created URLs only if they look like blob: URLs
      Object.values(urls).forEach((val) => {
        if (Array.isArray(val)) val.forEach((u) => { if (typeof u === 'string' && u.startsWith('blob:')) try { URL.revokeObjectURL(u); } catch (_) {} });
        else if (typeof val === 'string' && val && val.startsWith('blob:')) try { URL.revokeObjectURL(val); } catch (_) {}
      });
    };
  }, [formData]);

  const friendlyType = (s: string) => {
    if (!s) return '—';
    if (s === 'fremdverschuldet') return 'Fremdverschuldeter Schaden';
    return s;
  };

  return (
    <div className="form-summary">
      <div className="summary-title">Zusammenfassung Ihrer Angaben</div>

      <div className="summary-section">
        <h3>Schadensart</h3>
        <p className="summary-value">{friendlyType(formData?.schadensArt)}</p>
      </div>

      <div className="summary-section">
        <h3>Bildaufnahmen</h3>
        <div className="images-grid">
          {/* Render all known image fields in a defined order so every uploaded file is shown */}
          {(() => {
            const orderedKeys = ['vorneRechts','hintenLinks','schadenBereich','schadenDetails','kilometerstand','fahrzeugschein','zusatzDokumente'];
            const labelMap: Record<string,string> = {
              vorneRechts: 'Vorderansicht', hintenLinks: 'Rückansicht', schadenBereich: 'Schadenbereich', schadenDetails: 'Detailbilder', kilometerstand: 'Kilometerstand', fahrzeugschein: 'Fahrzeugschein', zusatzDokumente: 'Zusatzdokumente'
            };
            const stepMap: Record<string,number> = { vorneRechts: 3, hintenLinks: 4, schadenBereich: 5, schadenDetails: 6, kilometerstand: 7, fahrzeugschein: 8, zusatzDokumente: 9 };

            return orderedKeys.map((k) => {
              const raw = (previews as any)[k];
              const imgs: string[] = [];
              try {
                if (Array.isArray(raw)) imgs.push(...(raw as string[]));
                else if (typeof raw === 'string' && raw) imgs.push(raw as string);
              } catch (e) {}
              const valid = imgs.filter(u => typeof u === 'string' && u.length > 0);

              // If previews doesn't have entries but the underlying formData contains files, try to create fallback previews
              let hasFiles = false;
              try {
                const fdVal = (formData?.bilder ?? {})[k];
                if (Array.isArray(fdVal)) hasFiles = fdVal.filter((f:any) => f instanceof File).length > 0;
                else hasFiles = fdVal instanceof File;
              } catch (e) { /* ignore */ }

              return (
                <div key={k} className="image-item">
                  <div className="image-label">{labelMap[k] || k}</div>
                  {valid.length > 0 ? (
                    valid.map((u, i) => <img key={i} src={u} alt={`${k}-${i}`} />)
                  ) : hasFiles ? (
                    // files exist but preview not yet generated (edge case)
                    <div className="image-missing">Vorschau nicht verfügbar</div>
                  ) : (
                    <div className="image-missing">Keine Dateien</div>
                  )}
                  { (hasFiles || ((formData?.zusatzDokumente && k === 'zusatzDokumente') && formData.zusatzDokumente.length)) && (
                    <button className="edit-button" onClick={() => onEdit(stepMap[k] || 9)}>Bearbeiten</button>
                  )}
                </div>
              );
            });
          })()}
        </div>
      </div>

      <div className="summary-section">
        <h3>Kontaktdaten</h3>
        <div className="contact-summary">
          <p><strong>Name:</strong> {formData?.kontakt?.vorname || '—'} {formData?.kontakt?.name || ''}</p>
          <p><strong>Adresse:</strong> {formData?.kontakt?.strasse ? `${formData.kontakt.strasse}${formData.kontakt.plz ? ', ' + formData.kontakt.plz : ''}${formData.kontakt.ort ? ' ' + formData.kontakt.ort : ''}` : '—'}</p>
          <p><strong>Telefon:</strong> {formData?.kontakt?.telefon || '—'}</p>
          <p><strong>E-Mail:</strong> {formData?.kontakt?.email || '—'}</p>
        </div>
      </div>
    </div>
  );
}


