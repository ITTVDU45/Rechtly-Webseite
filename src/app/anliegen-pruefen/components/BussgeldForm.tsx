"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import './bussgeld-form.css';
import UploadHandler from './UploadHandler';
import ProcessProgress from './ProcessProgress';
import Stepper, { Step } from '../../../components/ui/Stepper';
import { loadJSON } from '../lib/localStorage';
// useAutoSave will be required lazily below to avoid SSR/runtime issues

type Allgemein = {
  vorwurf: string;
  fahrzeugTyp: string;
  punktestand: string;
  probezeit: string;
  schreiben: string;
  dokumente: File[];
};

type Kosten = {
  kostenuebernahme: string;
};

type Person = {
  anrede: string;
  titel: string;
  vorname: string;
  nachname: string;
  weitereVornamen: string;
  geburtsname: string;
  geburtsdatum: string;
  geburtsort: string;
  strasse: string;
  hausNr: string;
  plz: string;
  wohnort: string;
  email: string;
  emailBestaetigung: string;
  telefon: string;
};

type FormData = {
  service: string;
  allgemein: Allgemein;
  kosten: Kosten;
  person: Person;
};

export default function BussgeldForm() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [stepperDone, setStepperDone] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    service: '',
    allgemein: {
      vorwurf: '',
      fahrzeugTyp: '',
      punktestand: '',
      probezeit: '',
      schreiben: '',
      dokumente: []
    },
    kosten: { kostenuebernahme: '' },
    person: {
      anrede: '', titel: '', vorname: '', nachname: '', weitereVornamen: '', geburtsname: '', geburtsdatum: '', geburtsort: '', strasse: '', hausNr: '', plz: '', wohnort: '', email: '', emailBestaetigung: '', telefon: ''
    }
  });

  const [hydrated, setHydrated] = useState<boolean>(false);

  // read draft from localStorage only on client to avoid hydration mismatch
  React.useEffect(() => {
    try {
      const raw = window.localStorage.getItem('anliegen-draft-bussgeld');
      if (raw) {
        const parsed = JSON.parse(raw) as FormData | null;
        if (parsed) setFormData(parsed);
      }
    } catch (e) {
      // ignore
    }
    setHydrated(true);
  }, []);

  // defensive lazy require for autosave
  useEffect(() => {
    let schedule: (() => void) | null = null;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const maybe = require('../hooks/useAutoSave');
      const hook = maybe?.useAutoSave ?? maybe?.default ?? null;
      if (typeof hook === 'function') {
        const obj = hook('anliegen-draft-bussgeld', () => formData, 800);
        schedule = obj?.scheduleSave ?? null;
      }
    } catch (e) {
      schedule = null;
    }

    if (schedule) schedule();
  }, [formData]);

  const serviceOptionen = [
    { id: 'bussgeld', title: 'Bußgeldprüfung', icon: '📋' },
    { id: 'individuell', title: 'Individuelle Anfrage', icon: '✍️' }
  ];

  const vorwurfOptionen = [
    { value: 'geschwindigkeit', label: 'Geschwindigkeitsüberschreitung' },
    { value: 'rotlicht', label: 'Rotlichtverstoß' },
    { value: 'abstand', label: 'Abstandsverstoß' },
    { value: 'handy', label: 'Handynutzung' },
    { value: 'alkohol', label: 'Alkohol/Drogen' },
    { value: 'sonstiges', label: 'Sonstiger Verstoß' }
  ];

  const fahrzeugOptionen = [
    { value: 'pkw', label: 'PKW' },
    { value: 'lkw', label: 'LKW' },
    { value: 'motorrad', label: 'Motorrad' },
    { value: 'sonstiges', label: 'Sonstiges' }
  ];

  const schreibenOptionen = [
    { value: 'anhoerung', label: 'Anhörung im Bußgeldverfahren' },
    { value: 'bussgeld', label: 'Bußgeldbescheid' },
    { value: 'zeugenfragebogen', label: 'Zeugenfragebogen' },
    { value: 'sonstiges', label: 'Sonstiges Schreiben' }
  ];

  const handleServiceSelect = (serviceId: string) => {
    setFormData(prev => ({ ...prev, service: serviceId }));
    setCurrentStep(2);
  };

  const handleInputChange = (section: keyof FormData | 'allgemein' | 'kosten' | 'person', field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value
      }
    } as FormData));
    // if user changes allgemein fields, reset stepper completion
    if (section === 'allgemein') setStepperDone(false);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(prev => prev - 1);
    else router.push('/');
  };

  const handleNext = () => {
    if (validateStep(currentStep)) setCurrentStep(prev => prev + 1);
  };

  const handleSubmit = async () => {
    // simple client-side submit placeholder: forward to API
    try {
      const res = await fetch('/api/anliegen/submit', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ type: 'bussgeld', payload: formData }) });
      const json = await res.json();
      if (res.ok) {
        alert('Vielen Dank — Ihre Anfrage wurde übermittelt.');
        // clear draft
        localStorage.removeItem('anliegen-draft-bussgeld');
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
    if (step === 1) return !!formData.service; // require service selection on first page
    if (step === 2) {
      // require at least one uploaded document/photo for step 2
      const hasUpload = Array.isArray(formData.allgemein.dokumente) && formData.allgemein.dokumente.length > 0;
      return !!formData.allgemein.vorwurf && !!formData.allgemein.fahrzeugTyp && formData.allgemein.probezeit !== '' && hasUpload;
    }
    if (step === 3) {
      return !!formData.kosten.kostenuebernahme;
    }
    if (step === 4) {
      // intermediate steps; always allow
      return true;
    }
    if (step === 5) {
      return true;
    }
    if (step === 6) {
      return true;
    }
    if (step === 7) {
      // contact step validation: require name, vorname, email, telefon, strasse, plz, wohnort
      return !!formData.person.vorname && !!formData.person.nachname && !!formData.person.email && !!formData.person.telefon && !!formData.person.strasse && !!formData.person.plz && !!formData.person.wohnort;
    }
    return true;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files ? Array.from(event.target.files) : [];
    setFormData(prev => ({
      ...prev,
      allgemein: { ...prev.allgemein, dokumente: [...(prev.allgemein.dokumente || []), ...files] }
    }));
  };

  const handleSingleUpload = async (file: File) => {
    setFormData(prev => ({
      ...prev,
      allgemein: { ...prev.allgemein, dokumente: [...(prev.allgemein.dokumente || []), file] }
    }));
  };

  const handleUploadError = (msg: string) => {
    // simple UX: show alert and keep in-page validation
    alert(msg);
  };

  const handleRemoveFile = (index: number) => {
    setFormData(prev => ({
      ...prev,
      allgemein: { ...prev.allgemein, dokumente: prev.allgemein.dokumente.filter((_, i) => i !== index) }
    }));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-container">
            <div className="step-content">
              {/* back-link removed */}
              <div className="service-selection">
                <h2>Welchen Service dürfen wir Ihnen anbieten?</h2>
                <div className="options-grid">
                  {serviceOptionen.map(option => (
                    <button key={option.id} className={`option-button`} onClick={() => handleServiceSelect(option.id)}>
                      <span className="option-icon">{option.icon}</span>
                      <span className="option-title">{option.title}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="navigation-buttons">
                <button className="back-button" onClick={() => router.push('/')}>Zurück</button>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="step-container">
            <div className="step-content">
              <h2>Allgemeine Angaben</h2>
              <Stepper
                initialStep={1}
                onStepChange={(s: number) => { /* step change tracked below via local state */ }}
                onFinalStepCompleted={() => handleSubmit()}
                backButtonText="Zurück"
                nextButtonText="Weiter"
                finalButtonText="Anliegen prüfen"
                validateStep={(step: number) => {
                  /* inner stepper mapping: 1=vorwurf,2=fahrzeug,3=punktestand(optional),4=probezeit,5=schreiben,6=upload,7=kosten,8=kontakt,9=summary */
                  if (step === 3) return true; // punktestand optional
                  if (step === 1) return !!formData.allgemein.vorwurf;
                  if (step === 2) return !!formData.allgemein.fahrzeugTyp;
                  if (step === 4) return formData.allgemein.probezeit === 'ja' || formData.allgemein.probezeit === 'nein';
                  if (step === 5) return !!formData.allgemein.schreiben;
                  if (step === 6) return Array.isArray(formData.allgemein.dokumente) && formData.allgemein.dokumente.length > 0;
                  if (step === 7) return !!formData.kosten.kostenuebernahme;
                  if (step === 8) return !!formData.person.vorname && !!formData.person.nachname && !!formData.person.email && !!formData.person.telefon && !!formData.person.strasse && !!formData.person.plz && !!formData.person.wohnort;
                  // summary (step 9) is view-only; allow
                  return true;
                }}
                backButtonProps={{ className: 'back-button stepper-back' }}
                nextButtonProps={{ className: 'next-button stepper-next' }}
                contentClassName=""
              >
                <Step>
                  <div>
                    <h3 className="question-title">Was wird Ihnen vorgeworfen?</h3>
                    <div className="options-grid">
                      {vorwurfOptionen.map(o => (
                        <button key={o.value} className={`option-button ${hydrated && formData.allgemein.vorwurf === o.value ? 'selected' : ''}`} onClick={() => handleInputChange('allgemein', 'vorwurf', o.value)}>
                          <span className="option-title">{o.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Step>

                <Step>
                  <div>
                    <h3 className="question-title">Mit welchem Fahrzeug waren Sie unterwegs?</h3>
                    <div className="options-grid">
                      {fahrzeugOptionen.map(o => (
                        <button key={o.value} className={`option-button ${hydrated && formData.allgemein.fahrzeugTyp === o.value ? 'selected' : ''}`} onClick={() => handleInputChange('allgemein', 'fahrzeugTyp', o.value)}>
                          <span className="option-title">{o.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Step>

                <Step>
                  <div>
                    <h3 className="question-title">Wie hoch ist Ihr Punktestand in Flensburg? (falls bekannt)</h3>
                    <div className="form-group">
                      <input type="number" id="punktestand" min={0} max={8} value={formData.allgemein.punktestand} onChange={(e) => handleInputChange('allgemein','punktestand', e.target.value)} />
                    </div>
                  </div>
                </Step>

                <Step>
                  <div>
                    <h3 className="question-title">Waren Sie zum Zeitpunkt des Vorfalls in der Probezeit?</h3>
                    <div className="options-grid">
                      <button className={`option-button ${hydrated && formData.allgemein.probezeit === 'ja' ? 'selected' : ''}`} onClick={() => handleInputChange('allgemein','probezeit','ja')}>Ja</button>
                      <button className={`option-button ${hydrated && formData.allgemein.probezeit === 'nein' ? 'selected' : ''}`} onClick={() => handleInputChange('allgemein','probezeit','nein')}>Nein</button>
                    </div>
                  </div>
                </Step>

                <Step>
                  <div>
                    <h3 className="question-title">Welches Schreiben haben Sie erhalten?</h3>
                    <div className="options-grid">
                      {schreibenOptionen.map(o => (
                        <button key={o.value} className={`option-button ${hydrated && formData.allgemein.schreiben === o.value ? 'selected' : ''}`} onClick={() => handleInputChange('allgemein','schreiben', o.value)}>
                          <span className="option-title">{o.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </Step>

                <Step>
                  <div className="form-group file-upload">
                    <label>Upload</label>
                    <UploadHandler acceptedTypes="image/*,.pdf" onUpload={(f: File) => handleSingleUpload(f)} onError={handleUploadError} />
                    <div className="upload-hint">Laden Sie hier relevante Dokumente hoch (PDF, JPG, PNG) oder erstellen Sie ein Foto.</div>
                    {formData.allgemein.dokumente && formData.allgemein.dokumente.length > 0 && (
                      <div className="uploaded-files">
                        {formData.allgemein.dokumente.map((file, index) => (
                          <div key={index} className="file-item">
                            <span>{file.name}</span>
                            <button type="button" onClick={() => handleRemoveFile(index)} className="remove-file">×</button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </Step>
                <Step>
                  <div>
                    <h3 className="question-title">Wer trägt die Kosten?</h3>
                    <div className="options-grid">
                      <button className={`option-button ${hydrated && formData.kosten.kostenuebernahme === 'versicherung' ? 'selected' : ''}`} onClick={() => handleInputChange('kosten', 'kostenuebernahme', 'versicherung')}>
                        <span className="option-icon">🛡️</span>
                        <span className="option-title">Ich habe eine Rechtsschutzversicherung und möchte sie zur Deckung der Kosten in Anspruch nehmen.</span>
                      </button>
                      <button className={`option-button ${hydrated && formData.kosten.kostenuebernahme === 'selbst' ? 'selected' : ''}`} onClick={() => handleInputChange('kosten', 'kostenuebernahme', 'selbst')}>
                        <span className="option-icon">💶</span>
                        <span className="option-title">Ich möchte die anfallenden Rechtsanwaltskosten selbst tragen und übernehme das Prozesskostenrisiko.</span>
                      </button>
                    </div>
                  </div>
                </Step>

                <Step>
                  <div>
                    <h3 className="question-title">Kontaktdaten</h3>
                    <div className="contact-vertical">
                      <div className="form-group">
                        <label htmlFor="vorname">Vorname <span className="required">*</span></label>
                        <input id="vorname" type="text" value={formData.person.vorname} onChange={(e) => handleInputChange('person', 'vorname', e.target.value)} required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="nachname">Nachname <span className="required">*</span></label>
                        <input id="nachname" type="text" value={formData.person.nachname} onChange={(e) => handleInputChange('person', 'nachname', e.target.value)} required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="email">E‑Mail <span className="required">*</span></label>
                        <input id="email" type="email" value={formData.person.email} onChange={(e) => handleInputChange('person', 'email', e.target.value)} required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="telefon">Telefonnummer <span className="required">*</span></label>
                        <input id="telefon" type="tel" value={formData.person.telefon} onChange={(e) => handleInputChange('person', 'telefon', e.target.value)} required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="strasse">Adresse <span className="required">*</span></label>
                        <input id="strasse" type="text" value={formData.person.strasse} onChange={(e) => handleInputChange('person', 'strasse', e.target.value)} required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="plz">PLZ <span className="required">*</span></label>
                        <input id="plz" type="text" value={formData.person.plz} onChange={(e) => handleInputChange('person', 'plz', e.target.value)} required />
                      </div>

                      <div className="form-group">
                        <label htmlFor="wohnort">Stadt <span className="required">*</span></label>
                        <input id="wohnort" type="text" value={formData.person.wohnort} onChange={(e) => handleInputChange('person', 'wohnort', e.target.value)} required />
                      </div>
                    </div>
                  </div>
                </Step>

                <Step>
                  <div>
                    <h3 className="question-title">Zusammenfassung</h3>
                    <div className="form-grid" style={{ background: 'transparent', padding: 0 }}>
                      <div className="full-width" style={{ background: '#fff', padding: '1rem', borderRadius: 8 }}>
                        <h4>Allgemeine Angaben</h4>
                        <p><strong>Vorwurf:</strong> {vorwurfOptionen.find(o => o.value === formData.allgemein.vorwurf)?.label ?? '—'}</p>
                        <p><strong>Fahrzeug:</strong> {fahrzeugOptionen.find(o => o.value === formData.allgemein.fahrzeugTyp)?.label ?? '—'}</p>
                        <p><strong>Punktestand:</strong> {formData.allgemein.punktestand || 'nicht angegeben'}</p>
                        <p><strong>Probezeit:</strong> {formData.allgemein.probezeit || '—'}</p>
                        <p><strong>Schreiben:</strong> {schreibenOptionen.find(o => o.value === formData.allgemein.schreiben)?.label ?? '—'}</p>
                      </div>

                      <div className="full-width" style={{ background: '#fff', padding: '1rem', borderRadius: 8 }}>
                        <h4>Hochgeladene Dokumente</h4>
                        {formData.allgemein.dokumente && formData.allgemein.dokumente.length > 0 ? (
                          <div className="uploaded-files">
                            {formData.allgemein.dokumente.map((file, i) => (
                              <div key={i} className="file-item" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                {file.type.startsWith('image/') ? (
                                  <img src={URL.createObjectURL(file)} alt={file.name} style={{ width: 64, height: 64, objectFit: 'cover', borderRadius: 6 }} />
                                ) : (
                                  <div style={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f3f4f6', borderRadius: 6 }}>{file.name.split('.').pop()}</div>
                                )}
                                <div style={{ flex: 1 }}>
                                  <div style={{ fontWeight: 700 }}>{file.name}</div>
                                  <div style={{ fontSize: 12, color: '#475569' }}>{Math.round((file.size / 1024) * 10) / 10} KB</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p>Keine Dokumente hochgeladen.</p>
                        )}
                      </div>

                      <div className="full-width" style={{ background: '#fff', padding: '1rem', borderRadius: 8 }}>
                        <h4>Kontaktdaten</h4>
                        <p><strong>Name:</strong> {formData.person.vorname} {formData.person.nachname}</p>
                        <p><strong>E‑Mail:</strong> {formData.person.email}</p>
                        <p><strong>Telefon:</strong> {formData.person.telefon}</p>
                        <p><strong>Adresse:</strong> {formData.person.strasse}, {formData.person.plz} {formData.person.wohnort}</p>
                      </div>
                    </div>
                    {/* Stepper footer already provides navigation buttons; no duplicate buttons here */}
                  </div>
                </Step>
              </Stepper>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-container">
            <div className="step-content">
              <h2>Wer trägt die Kosten?</h2>
              <div className="options-grid">
                <button className={`option-button ${formData.kosten.kostenuebernahme === 'versicherung' ? 'selected' : ''}`} onClick={() => handleInputChange('kosten', 'kostenuebernahme', 'versicherung')}>
                  <span className="option-icon">🛡️</span>
                  <span className="option-title">Ich habe eine Rechtsschutzversicherung und möchte sie zur Deckung der Kosten in Anspruch nehmen.</span>
                </button>

                <button className={`option-button ${formData.kosten.kostenuebernahme === 'selbst' ? 'selected' : ''}`} onClick={() => handleInputChange('kosten', 'kostenuebernahme', 'selbst')}>
                  <span className="option-icon">💶</span>
                  <span className="option-title">Ich möchte die anfallenden Rechtsanwaltskosten selbst tragen und übernehme das Prozesskostenrisiko.</span>
                </button>
              </div>

              <div className="navigation-buttons">
                <button className="back-button" onClick={handleBack}>Zurück</button>
                <button className="next-button" onClick={handleNext} disabled={!validateStep(3)}>Weiter</button>
              </div>
            </div>
          </div>
        );

      case 7:
        return (
          <div className="step-container">
            <div className="step-content">
              <h2>Kontaktdaten</h2>
              <form className="form-grid">
                <div className="grid-two-col">
                  <div className="form-group">
                    <label htmlFor="vorname">Vorname <span className="required">*</span></label>
                    <input id="vorname" type="text" value={formData.person.vorname} onChange={(e) => handleInputChange('person', 'vorname', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nachname">Nachname <span className="required">*</span></label>
                    <input id="nachname" type="text" value={formData.person.nachname} onChange={(e) => handleInputChange('person', 'nachname', e.target.value)} required />
                  </div>
                </div>

                <div className="grid-two-col">
                  <div className="form-group">
                    <label htmlFor="email">E-Mail <span className="required">*</span></label>
                    <input id="email" type="email" value={formData.person.email} onChange={(e) => handleInputChange('person', 'email', e.target.value)} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="telefon">Telefonnummer <span className="required">*</span></label>
                    <input id="telefon" type="tel" value={formData.person.telefon} onChange={(e) => handleInputChange('person', 'telefon', e.target.value)} required />
                  </div>
                </div>

                <div className="grid-two-col">
                  <div className="form-group">
                    <label htmlFor="strasse">Adresse <span className="required">*</span></label>
                    <input id="strasse" type="text" value={formData.person.strasse} onChange={(e) => handleInputChange('person', 'strasse', e.target.value)} required />
                  </div>
                  <div className="grid-two-col">
                    <div className="form-group">
                      <label htmlFor="plz">PLZ <span className="required">*</span></label>
                      <input id="plz" type="text" value={formData.person.plz} onChange={(e) => handleInputChange('person', 'plz', e.target.value)} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="wohnort">Stadt <span className="required">*</span></label>
                      <input id="wohnort" type="text" value={formData.person.wohnort} onChange={(e) => handleInputChange('person', 'wohnort', e.target.value)} required />
                    </div>
                  </div>
                </div>

              </form>

              <div className="navigation-buttons">
                <button className="back-button" onClick={handleBack}>Zurück</button>
                <button className="next-button" onClick={handleSubmit} disabled={!validateStep(7)}>Absenden</button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bussgeld-container">
      {/* header removed to avoid overlap with hero */}

      {/* Hero similar to Kfz form */}
      <section className="bussgeld-hero">
        <div className="bussgeld-hero-inner">
          <h1>Bußgeldprüfung schnell & digital</h1>
          <p>Schicke uns deine Unterlagen — wir prüfen unkompliziert und kostenlos.</p>
          <button className="bussgeld-hero-cta" onClick={() => { const el = document.querySelector('.stepper-wrapper'); if (el) window.scrollTo({ top: (el as HTMLElement).offsetTop - 90, behavior: 'smooth' }); }}>Zum Formular</button>
        </div>
      </section>

      <div className="progress-container"><div className="progress-bar"><div className="progress" style={{ width: `${(currentStep/7) * 100}%` }} /></div></div>

      {renderStep()}
    </div>
  );
}


