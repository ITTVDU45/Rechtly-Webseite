"use client";
import React, { useState, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './contact-form-mobile.css';

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
    <div className="contact-form-container">
      <form id="form" onSubmit={onSubmit} className="contact-form">
        <h3 className="contact-form-title">Nachricht senden</h3>

        <div className="contact-form-grid">
          <input 
            value={firstName} 
            onChange={(e) => setFirstName(e.target.value)} 
            placeholder="Vorname *" 
            className="contact-form-input touch-target" 
            required 
            disabled={status === 'loading'}
          />
          <input 
            value={lastName} 
            onChange={(e) => setLastName(e.target.value)} 
            placeholder="Nachname *" 
            className="contact-form-input touch-target" 
            required 
            disabled={status === 'loading'}
          />
          <input 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            placeholder="E-Mail *" 
            type="email"
            className="contact-form-input touch-target" 
            required 
            disabled={status === 'loading'}
          />
          <input 
            value={phone} 
            onChange={(e) => setPhone(e.target.value)} 
            placeholder="Telefonnummer" 
            className="contact-form-input touch-target" 
            disabled={status === 'loading'}
          />
          <input 
            value={address} 
            onChange={(e) => setAddress(e.target.value)} 
            placeholder="Adresse" 
            className="contact-form-input touch-target" 
            disabled={status === 'loading'}
          />
          <textarea 
            value={message} 
            onChange={(e) => setMessage(e.target.value)} 
            placeholder="Deine Nachricht *" 
            className="contact-form-textarea touch-target" 
            required 
            disabled={status === 'loading'}
          />
        </div>

        <div className="contact-form-checkbox-container">
          <input
            type="checkbox"
            id="dsgvo"
            checked={acceptDSGVO}
            onChange={(e) => setAcceptDSGVO(e.target.checked)}
            className="contact-form-checkbox touch-target"
            disabled={status === 'loading'}
          />
          <label htmlFor="dsgvo" className="contact-form-checkbox-label">
            Ich habe die <a href="/datenschutz">Datenschutzerklärung</a> gelesen und bin damit einverstanden, dass meine Daten zur Bearbeitung meiner Anfrage verwendet werden. *
          </label>
        </div>

        <div className="contact-form-recaptcha">
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // Demo-Key für Testzwecke
            onChange={() => status === 'error' && setStatus(null)}
          />
        </div>

        <div className="contact-form-button-container">
          <button
            type="submit"
            className="contact-form-button touch-target"
            disabled={status === 'loading'}
          >
            {status === 'loading' ? 'Wird gesendet...' : 'Senden'}
          </button>
          {status === 'success' && (
            <div className="contact-form-message success">
              Deine Nachricht wurde erfolgreich versendet. Wir werden uns zeitnah bei dir melden.
            </div>
          )}
          {status === 'error' && (
            <div className="contact-form-message error">
              {errorMessage || 'Bitte überprüfe deine Eingaben.'}
            </div>
          )}
        </div>
        
        <div className="contact-form-required">
          * Pflichtfelder
        </div>
      </form>
    </div>
  );
}