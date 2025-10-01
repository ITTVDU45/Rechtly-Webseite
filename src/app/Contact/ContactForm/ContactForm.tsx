"use client";
import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

export default function ContactForm(): JSX.Element {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [acceptDSGVO, setAcceptDSGVO] = useState(false);
  const [status, setStatus] = useState<null | 'success' | 'error' | 'loading'>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  function validateEmail(e: string) {
    return /\S+@\S+\.\S+/.test(e);
  }

  function validatePhone(p: string) {
    // Einfache Validierung für deutsche Telefonnummern
    return /^(\+49|0)[0-9]{6,14}$/.test(p.replace(/\s/g, ''));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMessage('');
    
    // Validierung der Felder
    if (!firstName || !lastName) {
      setStatus('error');
      setErrorMessage('Bitte gib deinen Vor- und Nachnamen ein.');
      return;
    }
    
    if (!validateEmail(email)) {
      setStatus('error');
      setErrorMessage('Bitte gib eine gültige E-Mail-Adresse ein.');
      return;
    }
    
    if (phone && !validatePhone(phone)) {
      setStatus('error');
      setErrorMessage('Bitte gib eine gültige Telefonnummer ein.');
      return;
    }
    
    if (message.length < 10) {
      setStatus('error');
      setErrorMessage('Deine Nachricht sollte mindestens 10 Zeichen enthalten.');
      return;
    }
    
    if (!acceptDSGVO) {
      setStatus('error');
      setErrorMessage('Bitte akzeptiere die Datenschutzerklärung.');
      return;
    }
    
    // reCAPTCHA prüfen
    const recaptchaValue = recaptchaRef.current?.getValue();
    if (!recaptchaValue) {
      setStatus('error');
      setErrorMessage('Bitte bestätige, dass du kein Roboter bist.');
      return;
    }

    // Formular absenden
    setStatus('loading');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone,
          address,
          message,
          recaptchaToken: recaptchaValue
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        
        // Formular zurücksetzen
        setFirstName('');
        setLastName('');
        setEmail('');
        setPhone('');
        setAddress('');
        setMessage('');
        setAcceptDSGVO(false);
        recaptchaRef.current?.reset();
      } else {
        setStatus('error');
        setErrorMessage(data.error || 'Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
      }
    } catch (error) {
      setStatus('error');
      setErrorMessage('Es ist ein Fehler aufgetreten. Bitte versuche es später erneut.');
    }
  }

  return (
    <div>
      <form id="form" onSubmit={onSubmit} className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-xl font-semibold text-slate-800">Nachricht senden</h3>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            placeholder="Vorname *" 
            className="w-full border rounded-md px-3 py-2" 
            required 
            disabled={status === 'loading'}
          />
          <input 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            placeholder="Nachname *" 
            className="w-full border rounded-md px-3 py-2" 
            required 
            disabled={status === 'loading'}
          />
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="E-Mail *" 
            type="email"
            className="w-full border rounded-md px-3 py-2" 
            required 
            disabled={status === 'loading'}
          />
          <input 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="Telefonnummer" 
            className="w-full border rounded-md px-3 py-2" 
            disabled={status === 'loading'}
          />
          <input 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="Adresse" 
            className="w-full border rounded-md px-3 py-2 md:col-span-2" 
            disabled={status === 'loading'}
          />
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Deine Nachricht *" 
            className="w-full border rounded-md px-3 py-2 min-h-[140px] md:col-span-2" 
            required 
            disabled={status === 'loading'}
          />
        </div>

        <div className="mt-6">
          <div className="flex items-start mb-4">
            <input
              type="checkbox"
              id="dsgvo"
              checked={acceptDSGVO}
              onChange={(e) => setAcceptDSGVO(e.target.checked)}
              className="mt-1 mr-3"
              disabled={status === 'loading'}
            />
            <label htmlFor="dsgvo" className="text-sm text-slate-600">
              Ich habe die <a href="/datenschutz" className="text-blue-600 hover:underline">Datenschutzerklärung</a> gelesen und bin damit einverstanden, dass meine Daten zur Bearbeitung meiner Anfrage verwendet werden. *
            </label>
          </div>

          <div className="mb-6">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Demo-Key für Testzwecke
              onChange={() => status === 'error' && setStatus(null)}
            />
          </div>
        </div>

        <div className="mt-4 flex flex-col md:flex-row items-start md:items-center gap-4">
          <button
            type="submit"
            className={`rounded-xl py-3 px-6 transition-all duration-300 shadow-sm ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
            style={{ background: 'linear-gradient(135deg, #c7e70c 0%, #a3e635 100%)' }}
            disabled={status === 'loading'}
          >
            <span
              style={{
                background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                display: 'inline-block'
              }}
            >
              {status === 'loading' ? 'Wird gesendet...' : 'Senden'}
            </span>
          </button>
          {status === 'success' && (
            <div className="text-green-600 bg-green-50 px-4 py-2 rounded-md border border-green-200">
              Deine Nachricht wurde erfolgreich versendet. Wir werden uns zeitnah bei dir melden.
            </div>
          )}
          {status === 'error' && (
            <div className="text-red-600 bg-red-50 px-4 py-2 rounded-md border border-red-200">
              {errorMessage || 'Bitte überprüfe deine Eingaben.'}
            </div>
          )}
        </div>
        
        <div className="mt-4 text-xs text-slate-500">
          * Pflichtfelder
        </div>
      </form>
    </div>
  );
}