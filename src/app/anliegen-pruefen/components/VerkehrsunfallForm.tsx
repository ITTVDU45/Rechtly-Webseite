"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Stepper, { Step } from '../../../components/ui/Stepper';
import UploadHandler from './UploadHandler';
import { useRouter } from 'next/navigation';
import './verkehrsunfall-form.css';

type UnfallAllgemein = {
  unfallArt: string;
  unfallDatum: string;
  unfallZeit: string;
  unfallStrasse: string;
  unfallPlz: string;
  unfallOrt: string; // Stadt/Ort
  unfallGegner: string;
  polizei: string;
  verletzungen: string;
  dokumente: File[];
};

type Fahrzeug = {
  eigentuemer: string;
  halter: string;
  fahrzeugTyp: string;
  kennzeichen: string;
  farbe: string;
  versicherung: string;
  versicherungsNr: string;
  versicherungsArt: string;
  selbstbeteiligung: string;
  vorsteuerabzug: string;
  marke: string;
  modell: string;
};

type Personen = { versicherungsnehmer: string; fahrer: string; ansprechpartner: string };

type Persoenlich = { firma: string; vorname: string; nachname: string; anschrift: string; plzOrt: string; geburtsdatum: string; geburtsort: string; telefon: string; email: string; bank: string; iban: string; bic: string };

type FormState = {
  service: string;
  allgemein: UnfallAllgemein;
  kosten: { kostenuebernahme: string };
  fahrzeug: Fahrzeug;
  personen: Personen;
  persoenlich: Persoenlich;
};

export default function VerkehrsunfallForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormState>({
    service: '',
    allgemein: { unfallArt: '', unfallDatum: '', unfallZeit: '', unfallStrasse: '', unfallPlz: '', unfallOrt: '', unfallGegner: '', polizei: '', verletzungen: '', dokumente: [] },
    kosten: { kostenuebernahme: '' },
    fahrzeug: { eigentuemer: '', halter: '', fahrzeugTyp: '', kennzeichen: '', farbe: '', versicherung: '', versicherungsNr: '', versicherungsArt: '', selbstbeteiligung: '', vorsteuerabzug: '', marke: '', modell: '' },
    personen: { versicherungsnehmer: '', fahrer: '', ansprechpartner: '' },
    persoenlich: { firma: '', vorname: '', nachname: '', anschrift: '', plzOrt: '', geburtsdatum: '', geburtsort: '', telefon: '', email: '', bank: '', iban: '', bic: '' }
  });

  // read draft from localStorage only on client to avoid hydration mismatch
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem('anliegen-draft-verkehr');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed) setFormData(parsed as FormState);
      }
    } catch (e) {
      // ignore parse errors
    }
    // mark hydrated after client-only reads
    setHydrated(true);
  }, []);
  // autosave (lazy require with defensive fallback)
  let scheduleSave: (() => void) | null = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const maybe = require('../hooks/useAutoSave');
    const hook = maybe?.useAutoSave ?? maybe?.default ?? null;
    if (typeof hook === 'function') {
      const obj = hook('anliegen-draft-verkehr', () => formData, 800);
      scheduleSave = obj?.scheduleSave ?? null;
    }
  } catch (err) {
    scheduleSave = null;
  }

  useEffect(() => { if (scheduleSave) scheduleSave(); }, [formData]);

  const unfallArtOptionen = [
    { value: 'auffahrunfall', label: 'Auffahrunfall' },
    { value: 'parkrempler', label: 'Parkrempler' },
    { value: 'vorfahrt', label: 'Vorfahrtsverstoß' },
    { value: 'wildunfall', label: 'Wildunfall' },
    { value: 'sonstiges', label: 'Sonstiger Unfall' }
  ];

  const handleInputChange = (section: string, field: string, value: any) => {
    setFormData(prev => ({ ...prev, [section]: { ...(prev as any)[section], [field]: value } } as FormState));
  };

  const handleFileUpload = (section: string, event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setFormData(prev => ({ ...prev, [section]: { ...(prev as any)[section], dokumente: [...(prev as any)[section].dokumente || [], ...files] } } as FormState));
  };

  const handleNext = () => setCurrentStep(s => s + 1);
  const handleBack = () => setCurrentStep(s => Math.max(1, s - 1));

  const handleSubmit = async () => {
    try {
      const res = await fetch('/api/anliegen/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'verkehr', payload: formData }) });
      if (res.ok) {
        localStorage.removeItem('anliegen-draft-verkehr');
        alert('Vielen Dank — Ihre Anfrage wurde übermittelt.');
        router.push('/');
      } else {
        alert('Fehler beim Absenden');
      }
    } catch (e) {
      console.error(e);
      alert('Netzwerkfehler');
    }
  };

  const validateStep = (step: number) => {
    // steps: 1=Art,2=Datum,3=Zeit,4=Ort,5=Beschreibung,6=Kontakt,7=Summary
    if (step === 1) return !!formData.allgemein.unfallArt;
    if (step === 2) return !!formData.allgemein.unfallDatum;
    if (step === 3) return !!formData.allgemein.unfallZeit;
    if (step === 4) return !!formData.allgemein.unfallOrt;
    if (step === 4) return !!formData.allgemein.unfallStrasse && !!formData.allgemein.unfallPlz && !!formData.allgemein.unfallOrt;
    if (step === 5) return !!formData.allgemein.verletzungen;
    if (step === 6) return !!formData.persoenlich.vorname && !!formData.persoenlich.nachname && !!formData.persoenlich.email && !!formData.persoenlich.telefon;
    return true; // summary always allowed
  };

  const renderStep = () => {
    return (
      <div className="step-container">
        <div className="step-content">
          <h2>Unfalldetails</h2>
          <Stepper
        initialStep={1}
        onStepChange={(s: number) => setCurrentStep(s)}
        finalButtonText="Anliegen prüfen"
        validateStep={validateStep}
        onFinalStepCompleted={() => handleSubmit()}
        backButtonProps={{ className: 'back-button stepper-back' }}
        nextButtonProps={{ className: 'next-button stepper-next' }}
        contentClassName=""
      >
        <Step>
          <div>
            <h3 className="question-title">Art des Unfalls</h3>
            <div className="options-grid">
              {unfallArtOptionen.map(o => (
                <button key={o.value} className={`option-button ${hydrated && formData.allgemein.unfallArt === o.value ? 'selected' : ''}`} onClick={() => handleInputChange('allgemein','unfallArt', o.value)}>
                  <span className="option-title">{o.label}</span>
                </button>
              ))}
            </div>
          </div>
        </Step>

        <Step>
          <div>
            <h3 className="question-title">Unfalldatum</h3>
            <div className="date-picker">
              <input id="unfallDatum" className="date-input" type="date" value={formData.allgemein.unfallDatum} onChange={(e) => handleInputChange('allgemein','unfallDatum', e.target.value)} />
              <button type="button" className="date-icon" onClick={() => {
                const el = document.getElementById('unfallDatum') as HTMLInputElement | null;
                if (!el) return;
                // try showPicker (Chromium), fallback to focus
                try { (el as any).showPicker?.(); } catch (e) { el.focus(); }
              }} aria-label="Datum auswählen">📅</button>
            </div>
          </div>
        </Step>

        <Step>
          <div>
            <h3 className="question-title">Unfallzeit</h3>
            <div>
              <input type="time" value={formData.allgemein.unfallZeit} onChange={(e) => handleInputChange('allgemein','unfallZeit', e.target.value)} />
            </div>
          </div>
        </Step>

        <Step>
          <div>
            <h3 className="question-title">Unfallort</h3>
            <div className="form-grid">
              <div className="form-group">
                <label>Straße</label>
                <input value={formData.allgemein.unfallStrasse} onChange={(e) => handleInputChange('allgemein','unfallStrasse', e.target.value)} placeholder="Straße" />
              </div>
              <div className="form-group">
                <label>PLZ</label>
                <input value={formData.allgemein.unfallPlz} onChange={(e) => handleInputChange('allgemein','unfallPlz', e.target.value)} placeholder="PLZ" />
              </div>
              <div className="form-group">
                <label>Ort / Stadt</label>
                <input value={formData.allgemein.unfallOrt} onChange={(e) => handleInputChange('allgemein','unfallOrt', e.target.value)} placeholder="Ort" />
              </div>
            </div>
          </div>
        </Step>

        <Step>
          <div>
            <h3 className="question-title">Beschreibung</h3>
            <div className="form-group">
              <label className="white-label">Beschreibung / Verletzungen</label>
              <textarea value={formData.allgemein.verletzungen} onChange={(e) => handleInputChange('allgemein','verletzungen', e.target.value)} style={{ minHeight: 120 }} />
              <p className="field-hint">Beschreiben Sie die Situation und sagen Sie, was genau passiert ist.</p>
            </div>
            <div className="form-group file-upload" style={{ marginTop: '1rem' }}>
              <label>Upload</label>
              <UploadHandler acceptedTypes="image/*,.pdf" onUpload={async (f: File) => {
                setFormData(prev => ({ ...prev, allgemein: { ...prev.allgemein, dokumente: [...(prev.allgemein.dokumente || []), f] } }));
              }} onError={(m) => alert(m)} />
              <div className="upload-hint">Laden Sie hier die Dokumente, Bilder des Unfalls und Polizeiberichte etc. hoch.</div>
            </div>
          </div>
        </Step>

        <Step>
          <div>
            <h3 className="question-title">Kontaktdaten</h3>
            <div className="contact-vertical">
              <div className="form-group">
                <label>Vorname</label>
                <input value={formData.persoenlich.vorname} onChange={(e) => handleInputChange('persoenlich','vorname', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Nachname</label>
                <input value={formData.persoenlich.nachname} onChange={(e) => handleInputChange('persoenlich','nachname', e.target.value)} />
              </div>
              <div className="form-group">
                <label>E‑Mail</label>
                <input type="email" value={formData.persoenlich.email} onChange={(e) => handleInputChange('persoenlich','email', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Telefon</label>
                <input value={formData.persoenlich.telefon} onChange={(e) => handleInputChange('persoenlich','telefon', e.target.value)} />
              </div>
              <div className="form-group">
                <label>Adresse</label>
                <input value={formData.persoenlich.anschrift} onChange={(e) => handleInputChange('persoenlich','anschrift', e.target.value)} />
              </div>
              <div className="form-group">
                <label>PLZ / Ort</label>
                <input value={formData.persoenlich.plzOrt} onChange={(e) => handleInputChange('persoenlich','plzOrt', e.target.value)} />
              </div>
            </div>
          </div>
        </Step>

        <Step>
          <div>
            <h3 className="question-title">Zusammenfassung</h3>
            <div className="form-grid" style={{ background: 'transparent', padding: 0 }}>
              <div className="full-width" style={{ background: '#fff', padding: '1rem', borderRadius: 8 }}>
                <h4>Unfall</h4>
                <p><strong>Art:</strong> {unfallArtOptionen.find(o => o.value === formData.allgemein.unfallArt)?.label ?? '—'}</p>
                <p><strong>Datum:</strong> {formData.allgemein.unfallDatum || '—'}</p>
                <p><strong>Zeit:</strong> {formData.allgemein.unfallZeit || '—'}</p>
                <p><strong>Ort:</strong> {formData.allgemein.unfallOrt || '—'}</p>
                <p><strong>Beschreibung:</strong> {formData.allgemein.verletzungen || '—'}</p>
              </div>
              <div className="full-width" style={{ background: '#fff', padding: '1rem', borderRadius: 8 }}>
                <h4>Dokumente</h4>
                {formData.allgemein.dokumente && formData.allgemein.dokumente.length > 0 ? (
                  formData.allgemein.dokumente.map((f, i) => (
                    <div key={i} className="file-item" style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                      {f.type.startsWith('image/') ? <img src={URL.createObjectURL(f)} alt={f.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6 }} /> : <div style={{ width: 64, height: 64, background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>{f.name.split('.').pop()}</div>}
                      <div>
                        <div style={{ fontWeight: 700 }}>{f.name}</div>
                        <div style={{ fontSize: 12, color: '#475569' }}>{Math.round((f.size / 1024) * 10) / 10} KB</div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p>Keine Dokumente hochgeladen.</p>
                )}
              </div>
              <div className="full-width" style={{ background: '#fff', padding: '1rem', borderRadius: 8 }}>
                <h4>Kontakt</h4>
                <p>{formData.persoenlich.vorname} {formData.persoenlich.nachname}</p>
                <p>{formData.persoenlich.email}</p>
                <p>{formData.persoenlich.telefon}</p>
                <p>{formData.persoenlich.anschrift} {formData.persoenlich.plzOrt}</p>
              </div>
            </div>
          </div>
        </Step>
      </Stepper>
        </div>
      </div>
    );
  };

  return (
    <div className="verkehrsunfall-container">

      {/* Hero section reused from bussgeld-form */}
      <section className="bussgeld-hero">
        <div className="bussgeld-hero-inner">
          <h1>Verkehrsunfall melden — schnell & digital</h1>
          <p>Schicke uns deine Unterlagen — wir prüfen unkompliziert und helfen beim nächsten Schritt.</p>
          <button className="bussgeld-hero-cta" onClick={() => { const el = document.querySelector('.stepper-wrapper'); if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 90, behavior: 'smooth' }); }}>Zum Formular</button>
        </div>
      </section>

      <div className="progress-container"><div className="progress-bar"><div className="progress" style={{ width: `${(currentStep/7) * 100}%` }} /></div></div>
      {renderStep()}
    </div>
  );
}


