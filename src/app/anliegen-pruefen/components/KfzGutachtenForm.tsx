"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import './kfz-gutachten-form.css';
import './emergency-fix.css';
import ImagePreview from './ImagePreview';
import UploadHandler from './UploadHandler';
import ProcessProgress from './ProcessProgress';
import FormField from './FormField';
import HelpSystem from './HelpSystem';
import FormSummary from './FormSummary';
import ErrorBoundary from './ErrorBoundary';
import ConfirmDialog from './ConfirmDialog';
import AccessibilityWrapper from './AccessibilityWrapper';

type BilderState = {
  vorneRechts: File | null;
  hintenLinks: File | null;
  schadenBereich: File[];
  schadenDetails: File[];
  kilometerstand: File | null;
  fahrzeugschein: File | null;
};

type KontaktState = {
  vorname: string;
  name: string;
  telefon: string;
  email: string;
  strasse?: string;
  plz?: string;
  ort?: string;
  mobiltelefon?: string;
};

type FormState = {
  schadensArt: string;
  bilder: BilderState;
  kontakt: KontaktState;
  zusatzDokumente?: File[];
};

export default function KfzGutachtenForm() {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<FormState>({
    schadensArt: '',
    bilder: { vorneRechts: null, hintenLinks: null, schadenBereich: [], schadenDetails: [], kilometerstand: null, fahrzeugschein: null },
    kontakt: { vorname: '', name: '', telefon: '', email: '' },
    zusatzDokumente: []
  });

  // load saved draft on client only to avoid hydration mismatch
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const raw = window.localStorage.getItem('anliegen-draft-kfz');
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed) setFormData(parsed as FormState);
      }
    } catch (e) {
      // ignore
    }
  }, []);

  // autosave (lazy require with defensive fallback to avoid runtime crashes)
  let scheduleSave: (() => void) | null = null;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const maybe = require('../hooks/useAutoSave');
    const hook = maybe?.useAutoSave ?? maybe?.default ?? null;
    if (typeof hook === 'function') {
      const obj = hook('anliegen-draft-kfz', () => formData, 800);
      scheduleSave = obj?.scheduleSave ?? null;
    }
  } catch (err) {
    // swallow; keep scheduleSave null
    scheduleSave = null;
  }

  useEffect(() => {
    if (scheduleSave) scheduleSave();
  }, [formData]);

  const [errors, setErrors] = useState<Record<string,string>>({});
  const [showValidationMessage, setShowValidationMessage] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, bildTyp: keyof BilderState) => {
    const file = event.target.files?.[0] ?? null;
    setFormData(prev => ({ ...prev, bilder: { ...prev.bilder, [bildTyp]: file } }));
    setShowValidationMessage(false);
  };

  const handleMultipleImageUpload = (event: React.ChangeEvent<HTMLInputElement>, bildTyp: 'schadenBereich' | 'schadenDetails') => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setFormData(prev => ({ ...prev, bilder: { ...prev.bilder, [bildTyp]: [...(prev.bilder[bildTyp] || []), ...files] } }));
  };

  const handleZusatzUpload = async (file: File) => {
    setFormData(prev => ({ ...prev, zusatzDokumente: [...(prev.zusatzDokumente || []), file] }));
  };

  // UploadHandler integration helpers
  const handleSingleUpload = async (file: File, field: keyof BilderState) => {
    setFormData(prev => ({ ...prev, bilder: { ...prev.bilder, [field]: file } }));
    setShowValidationMessage(false);
  };

  const handleMultiUpload = async (file: File, field: 'schadenBereich' | 'schadenDetails') => {
    setFormData(prev => ({ ...prev, bilder: { ...prev.bilder, [field]: [...(prev.bilder[field] || []), file] } }));
  };

  const handleUploadError = (msg: string) => {
    setErrors(prev => ({ ...prev, upload: msg }));
  };

  const handleRemoveImage = (bildTyp: keyof BilderState, index?: number) => {
    if (index === undefined) {
      setFormData(prev => ({ ...prev, bilder: { ...prev.bilder, [bildTyp]: null } }));
      return;
    }
    setFormData(prev => ({ ...prev, bilder: { ...prev.bilder, [bildTyp]: (prev.bilder as any)[bildTyp].filter((_: any, i: number) => i !== index) } }));
  };

  const handleContactInput = (field: keyof KontaktState, value: string) => {
    setFormData(prev => ({ ...prev, kontakt: { ...prev.kontakt, [field]: value } }));
  };

  const handleAdditionalFiles = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setFormData(prev => ({ ...prev, zusatzDokumente: [...(prev.zusatzDokumente || []), ...files] }));
  };

  const handleRemoveAdditionalFile = (index: number) => {
    setFormData(prev => ({ ...prev, zusatzDokumente: prev.zusatzDokumente?.filter((_, i) => i !== index) }));
  };

  const isFormValid = () => {
    const { vorname, name, telefon, email, strasse, plz, ort } = formData.kontakt as KontaktState;
    return !!vorname && !!name && !!telefon && !!email && !!strasse && !!plz && !!ort && validateAllImages();
  };

  const validateAllImages = () => {
    // ensure all critical image steps have uploads
    // reuse validateImageStep mapping: steps 3..8 correspond to required image steps
    const required = [3,4,5,6,7,8];
    for (const s of required) {
      if (!validateImageStep(s)) return false;
    }
    return true;
  };

  const findFirstMissingImageStep = (): number | null => {
    const required = [3,4,5,6,7,8];
    for (const s of required) {
      if (!validateImageStep(s)) return s;
    }
    return null;
  };

  const handleSubmit = () => {
    if (!isFormValid()) {
      const missing = findFirstMissingImageStep();
      if (missing) {
        setErrors(prev => ({ ...prev, upload: 'Bitte laden Sie zunächst alle erforderlichen Bilder hoch.' }));
        setShowValidationMessage(true);
        setCurrentStep(missing);
        return;
      }
    }

    if (isFormValid()) {
      // send to API route
      (async () => {
        try {
          const res = await fetch('/api/anliegen/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ type: 'kfz-gutachten', payload: formData })
          });
          const data = await res.json();
          if (res.ok && data.ok) {
            alert('Vielen Dank — Ihre Anfrage wurde übermittelt.');
            setFormData({ ...formData, schadensArt: '', bilder: { vorneRechts: null, hintenLinks: null, schadenBereich: [], schadenDetails: [], kilometerstand: null, fahrzeugschein: null }, kontakt: { vorname: '', name: '', telefon: '', email: '' }, zusatzDokumente: [] });
            setCurrentStep(1);
          } else {
            console.error('API error', data);
            alert('Fehler beim Absenden. Bitte versuchen Sie es später erneut.');
          }
        } catch (err) {
          console.error(err);
          alert('Netzwerkfehler beim Absenden.');
        }
      })();
    }
  };

  const NavigationButtons: React.FC<any> = ({ currentStep, onBack, onNext, nextDisabled = false, nextText = 'Weiter', showBack = false }) => (
    <div className="navigation-buttons">
      {(currentStep > 1 || showBack) && <button onClick={onBack} className="action-button back-button equal-width">Zurück</button>}
      <button onClick={onNext} className="action-button next-button equal-width" disabled={nextDisabled}>{nextText}</button>
    </div>
  );

  const validateImageStep = (step: number) => {
    switch(step) {
      case 3: return !!(formData.bilder.vorneRechts && formData.bilder.vorneRechts instanceof File);
      case 4: return !!(formData.bilder.hintenLinks && formData.bilder.hintenLinks instanceof File);
      case 5: return Array.isArray(formData.bilder.schadenBereich) && formData.bilder.schadenBereich.filter((f:any)=> f instanceof File).length > 0;
      case 6: return Array.isArray(formData.bilder.schadenDetails) && formData.bilder.schadenDetails.filter((f:any)=> f instanceof File).length > 0;
      case 7: return !!(formData.bilder.kilometerstand && formData.bilder.kilometerstand instanceof File);
      case 8: return !!(formData.bilder.fahrzeugschein && formData.bilder.fahrzeugschein instanceof File);
      default: return true;
    }
  };

  const handleNextStep = () => {
    if (!validateImageStep(currentStep)) { setShowValidationMessage(true); return; }
    setCurrentStep(s => s + 1);
    setShowValidationMessage(false);
  };

  const goToStep = (target: number) => {
    // prevent advancing to a later step if intermediate required image steps are missing
    if (target > currentStep) {
      for (let s = currentStep; s < target; s++) {
        const check = validateImageStep(s);
        if (!check) {
          setErrors(prev => ({ ...prev, upload: 'Bitte zuerst fehlende Bilder hochladen.' }));
          setShowValidationMessage(true);
          setCurrentStep(s);
          return;
        }
      }
    }
    setCurrentStep(target);
  };

  const handleOptionSelect = (option: string) => { setFormData(prev => ({ ...prev, schadensArt: option })); setCurrentStep(2); };

  // Build steps array and render using Stepper
  const steps = [
    'Was ist passiert?',
    'Info',
    'Gesamtansicht Vorne Rechts',
    'Gesamtansicht Hinten Links',
    'Übersichtsbild Schadenbereich',
    'Detailbilder Schadenbereich',
    'Kilometerstand',
    'Fahrzeugschein',
    'Kontaktdaten'
  ];

  return (
    <div className="kfz-gutachten-container">
      {/* Hero section for KFZ Gutachten form */}
      <section className="kfz-hero">
        <div className="kfz-hero-inner">
          <h1>KFZ‑Gutachten schnell & digital</h1>
          <p>Schicken Sie uns Fotos und Kontaktdaten — wir prüfen Ihren Schaden kostenfrei.</p>
          <button className="kfz-hero-cta" onClick={() => { const el = document.querySelector('.stepper-wrapper'); if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 90, behavior: 'smooth' }); }}>Zum Formular</button>
        </div>
      </section>

      <div className="progress-container"><div className="progress-bar"><div className="progress" style={{ width: `${(currentStep/steps.length) * 100}%` }} /></div></div>
      {showValidationMessage && (<div className="validation-message" role="alert">Bitte laden Sie zuerst ein Bild hoch, bevor Sie fortfahren.</div>)}

      <div className="stepper-wrapper">
        <div className="step-header">
          <div className="step-title">Schritt {currentStep} von {steps.length}</div>
        </div>

        <div className="process-bar-container">
          <ProcessProgress currentStep={currentStep} totalSteps={steps.length} steps={steps} onSelectStep={(s) => goToStep(s)} />
        </div>

        {/* Stepper UI (only current step content) */}
        <div className="step-content">
          {currentStep === 1 && (
            <div className="step-container">
              <h2>Schritt 1 von 9 - Was ist passiert?</h2>
              <div className="options-container">
                <button className="option-button" onClick={() => handleOptionSelect('fremdverschuldet')}>Mein Auto wurde beschädigt. Ich bin nicht schuld.</button>
                <button className="option-button" onClick={() => handleOptionSelect('selbstverschuldet')}>Ich bin selbst schuld oder der Verursacher ist unbekannt.</button>
              </div>
              <div className="nav-actions"><button className="action-button back-button" disabled>Zurück</button><button className="action-button next-button" onClick={handleNextStep} disabled={!formData.schadensArt}>Weiter</button></div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="step-container">
              <h2>Schritt 2 von 9 - Info</h2>
              <div className="info-box">Der SchadenCHECK ist für Dich kostenlos! Wir rechnen mit der Versicherung des Verursachers ab.</div>
              <div className="nav-actions"><button className="action-button back-button" onClick={() => setCurrentStep(1)}>Zurück</button><button className="action-button next-button" onClick={handleNextStep}>Weiter</button></div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="step-container">
              <h2>Schritt 3 von 9 - Gesamtansicht Vorne Rechts</h2>
              <div className="upload-container">
                <div className="step-guidance">
                  <div className="guide-text">
                    <strong>Vorderansicht (vorne rechts)</strong>
                    <p>Bitte fotografieren Sie das ganze Fahrzeug von vorne rechts, so dass Stoßfänger und Kotflügel sichtbar sind.</p>
                  </div>
                  <div className="guide-image"><img src="/assets/images/vorne rechts.png" alt="Vorderansicht Beispiel" /></div>
                </div>
                <UploadHandler acceptedTypes="image/*" onUpload={(f: File) => handleSingleUpload(f, 'vorneRechts')} onError={handleUploadError} />
              {formData.bilder.vorneRechts instanceof File && (
                  <div className="preview-grid">
                    <div className="preview-container">
                      {/* only show preview if src is available inside ImagePreview */}
                      <ImagePreview image={formData.bilder.vorneRechts} onDelete={() => handleRemoveImage('vorneRechts')} title="Vorne Rechts" />
                    </div>
                  </div>
                )}
                {errors.upload && <div className="validation-message">{errors.upload}</div>}
              </div>
              <div className="nav-actions"><button className="action-button back-button" onClick={() => setCurrentStep(2)}>Zurück</button><button className="action-button next-button" onClick={handleNextStep} disabled={!validateImageStep(3)} aria-disabled={!validateImageStep(3)}>Weiter</button></div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="step-container">
              <h2>Schritt 4 von 9 - Gesamtansicht Hinten Links</h2>
              <div className="upload-container">
                <div className="step-guidance">
                  <div className="guide-text">
                    <strong>Rückansicht (hinten links)</strong>
                    <p>Fotografieren Sie das Fahrzeug von hinten links, zeigen Sie Heck und Stoßfänger.</p>
                  </div>
                  <div className="guide-image"><img src="/assets/images/hinten links.png" alt="Rückansicht Beispiel" /></div>
                </div>
                <UploadHandler acceptedTypes="image/*" onUpload={(f: File) => handleSingleUpload(f, 'hintenLinks')} onError={handleUploadError} />
                {formData.bilder.hintenLinks instanceof File && (
                  <div className="preview-grid">
                    <div className="preview-container">
                      <ImagePreview image={formData.bilder.hintenLinks} onDelete={() => handleRemoveImage('hintenLinks')} title="Hinten Links" />
                    </div>
                  </div>
                )}
              </div>
              <div className="nav-actions"><button className="action-button back-button" onClick={() => setCurrentStep(3)}>Zurück</button><button className="action-button next-button" onClick={handleNextStep} disabled={!validateImageStep(4)} aria-disabled={!validateImageStep(4)}>Weiter</button></div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="step-container">
              <h2>Schritt 5 von 9 - Übersichtsbild Schadenbereich</h2>
              <div className="upload-container">
                <div className="step-guidance">
                  <div className="guide-text">
                    <strong>Übersichtsbild Schadenbereich</strong>
                    <p>Machen Sie ein oder mehrere Übersichtsaufnahmen des Schadenbereichs, aus mehreren Blickwinkeln.</p>
                  </div>
                  <div className="guide-image"><img src="/assets/images/nahaufnahmen schade 2.png" alt="Übersichtsaufnahme Beispiel" /></div>
                </div>
                <UploadHandler acceptedTypes="image/*" onUpload={(f: File) => handleMultiUpload(f, 'schadenBereich')} onError={handleUploadError} />
                {Array.isArray(formData.bilder.schadenBereich) && formData.bilder.schadenBereich.filter((f: any) => f instanceof File).length > 0 && (
                  <div className="preview-grid">
                    {formData.bilder.schadenBereich.filter((f: any) => f instanceof File).map((file: File, i: number) => (
                      <div key={i} className="preview-container"><ImagePreview image={file} onDelete={() => handleRemoveImage('schadenBereich', i)} title={`Bild ${i + 1}`} /></div>
                    ))}
                  </div>
                )}
                {errors.upload && <div className="validation-message">{errors.upload}</div>}
              </div>
              <div className="nav-actions"><button className="action-button back-button" onClick={() => setCurrentStep(4)}>Zurück</button><button className="action-button next-button" onClick={handleNextStep} disabled={!validateImageStep(5)} aria-disabled={!validateImageStep(5)}>Weiter</button></div>
            </div>
          )}

          {currentStep === 6 && (
            <div className="step-container">
              <h2>Schritt 6 von 9 - Detailbilder Schadenbereich</h2>
              <div className="upload-container">
                <div className="step-guidance">
                  <div className="guide-text">
                    <strong>Detailbilder</strong>
                    <p>Fokussieren Sie nah auf einzelne Schadenstellen (Kratzer, Dellen), damit Details sichtbar werden.</p>
                  </div>
                  <div className="guide-image"><img src="/assets/images/nahaufnahme schaden.png" alt="Detailaufnahme Beispiel" /></div>
                </div>
                <UploadHandler acceptedTypes="image/*" onUpload={(f: File) => handleMultiUpload(f, 'schadenDetails')} onError={handleUploadError} />
                {Array.isArray(formData.bilder.schadenDetails) && formData.bilder.schadenDetails.filter((f: any) => f instanceof File).length > 0 && (
                  <div className="preview-grid">
                    {formData.bilder.schadenDetails.filter((f: any) => f instanceof File).map((file: File, i: number) => (
                      <div key={i} className="preview-container"><ImagePreview image={file} onDelete={() => handleRemoveImage('schadenDetails', i)} title={`Detail ${i + 1}`} /></div>
                    ))}
                  </div>
                )}
              </div>
              <div className="nav-actions"><button className="action-button back-button" onClick={() => setCurrentStep(5)}>Zurück</button><button className="action-button next-button" onClick={handleNextStep} disabled={!validateImageStep(6)} aria-disabled={!validateImageStep(6)}>Weiter</button></div>
            </div>
          )}

          {currentStep === 7 && (
            <div className="step-container">
              <h2>Schritt 7 von 9 - Kilometerstand</h2>
              <div className="upload-container">
                <div className="step-guidance">
                  <div className="guide-text">
                    <strong>Kilometerstand</strong>
                    <p>Fotografieren Sie das Armaturenbrett so, dass der Kilometerstand deutlich lesbar ist.</p>
                  </div>
                  <div className="guide-image"><img src="/assets/images/Kilometerstand.png" alt="Kilometerstand Beispiel" /></div>
                </div>
                <UploadHandler acceptedTypes="image/*" onUpload={(f: File) => handleSingleUpload(f, 'kilometerstand')} onError={handleUploadError} />
                {formData.bilder.kilometerstand instanceof File && (<ImagePreview image={formData.bilder.kilometerstand} onDelete={() => handleRemoveImage('kilometerstand')} title="Vorschau Kilometerstand" />)}
              </div>
              <div className="nav-actions"><button className="action-button back-button" onClick={() => setCurrentStep(6)}>Zurück</button><button className="action-button next-button" onClick={handleNextStep} disabled={!validateImageStep(7)} aria-disabled={!validateImageStep(7)}>Weiter</button></div>
            </div>
          )}

          {currentStep === 8 && (
            <div className="step-container">
              <h2>Schritt 8 von 9 - Fahrzeugschein Vorderseite</h2>
              <div className="upload-container">
                <div className="step-guidance">
                  <div className="guide-text">
                    <strong>Fahrzeugschein (Vorderseite)</strong>
                    <p>Bitte fotografieren Sie die Vorderseite des Fahrzeugscheins deutlich und vollständig.</p>
                  </div>
                  <div className="guide-image"><img src="/assets/images/Fahrzeugpapiere.png" alt="Fahrzeugschein Beispiel" /></div>
                </div>
                <UploadHandler acceptedTypes="image/*" onUpload={(f: File) => handleSingleUpload(f, 'fahrzeugschein')} onError={handleUploadError} />
                {formData.bilder.fahrzeugschein instanceof File && (<ImagePreview image={formData.bilder.fahrzeugschein} onDelete={() => handleRemoveImage('fahrzeugschein')} title="Vorschau Fahrzeugschein" />)}
              </div>
              <div className="nav-actions"><button className="action-button back-button" onClick={() => setCurrentStep(7)}>Zurück</button><button className="action-button next-button" onClick={handleNextStep} disabled={!validateImageStep(8)} aria-disabled={!validateImageStep(8)}>Weiter</button></div>
            </div>
          )}

          {currentStep === 9 && (
            <div className="step-container">
              <h2>Schritt 9 von 9 - Kontaktdaten</h2>

              <AccessibilityWrapper labelledBy="kontakt-title">
                <div className="contact-form">
                  <h3 style={{ marginTop: 0 }}>Ihre Kontaktdaten & weitere Bilder</h3>
                  <div className="grid-two-col">
                    <FormField id="vorname" label="Vorname*" value={formData.kontakt.vorname} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactInput('vorname', e.target.value)} required />
                    <FormField id="name" label="Name*" value={formData.kontakt.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactInput('name', e.target.value)} required />
                  </div>

                  <div className="grid-two-col">
                    <FormField id="telefon" label="Telefon*" type="tel" value={formData.kontakt.telefon} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactInput('telefon', e.target.value)} required />
                    <FormField id="email" label="E-Mail*" type="email" value={formData.kontakt.email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactInput('email', e.target.value)} required />
                  </div>

                  <div className="grid-three-col">
                    <FormField id="strasse" label="Adresse*" value={formData.kontakt.strasse || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactInput('strasse', e.target.value)} required />
                    <FormField id="plz" label="PLZ*" value={formData.kontakt.plz || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactInput('plz', e.target.value)} required />
                    <FormField id="ort" label="Ort*" value={formData.kontakt.ort || ''} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleContactInput('ort', e.target.value)} required />
                  </div>

                  <div className="file-upload-section">
                    <h4>Weitere Bilder oder Dokumente</h4>
                    <input type="file" multiple accept="image/*,.pdf" onChange={handleAdditionalFiles} id="additional-files" />
                    {formData.zusatzDokumente && formData.zusatzDokumente.length > 0 && (
                      <div className="file-list">{formData.zusatzDokumente.map((file, i) => (<div key={i} className="file-item"><span>{file.name}</span><button onClick={() => handleRemoveAdditionalFile(i)} className="remove-file-button">✕</button></div>))}</div>
                    )}
                  </div>

                </div>
              </AccessibilityWrapper>

              <div style={{ marginBottom: 16 }}>
                <ErrorBoundary>
                  <FormSummary formData={formData} onEdit={(step: number) => goToStep(step)} />
                </ErrorBoundary>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                <button onClick={() => setShowConfirm(true)} className="next-button" disabled={!isFormValid()}>Absenden</button>
              </div>

              <ConfirmDialog isOpen={showConfirm} title="Daten absenden" message="Möchten Sie die Daten jetzt absenden?" onCancel={() => setShowConfirm(false)} onConfirm={() => { setShowConfirm(false); handleSubmit(); }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


