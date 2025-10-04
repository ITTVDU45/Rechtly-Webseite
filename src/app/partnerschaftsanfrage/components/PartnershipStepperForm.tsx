'use client';

import React, { useState } from 'react';
import Section from '@/components/ui/Section';

interface FormData {
  // Schritt 1: Kontaktdaten
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  
  // Schritt 2: Unternehmensdetails
  businessType: string;
  employeeCount: string;
  location: string;
  website: string;
  
  // Schritt 3: Partnerschaftsdetails
  partnershipType: string;
  expectedVolume: string;
  experience: string;
  goals: string;
  
  // Schritt 4: Zusätzliche Informationen
  message: string;
  consent: boolean;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  businessType: 'gutachter',
  employeeCount: '',
  location: '',
  website: '',
  partnershipType: 'referral',
  expectedVolume: '',
  experience: '',
  goals: '',
  message: '',
  consent: false,
};

export default function PartnershipStepperForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const steps = [
    { id: 1, title: 'Kontaktdaten', description: 'Ihre persönlichen Informationen' },
    { id: 2, title: 'Unternehmen', description: 'Details zu Ihrem Unternehmen' },
    { id: 3, title: 'Partnerschaft', description: 'Ihre Partnerschaftsziele' },
    { id: 4, title: 'Abschluss', description: 'Zusätzliche Informationen' },
  ];

  const handleInputChange = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<FormData> = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'Vorname ist erforderlich';
        if (!formData.lastName.trim()) newErrors.lastName = 'Nachname ist erforderlich';
        if (!formData.email.trim()) {
          newErrors.email = 'E-Mail ist erforderlich';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = 'Bitte geben Sie eine gültige E-Mail-Adresse ein';
        }
        if (!formData.phone.trim()) newErrors.phone = 'Telefonnummer ist erforderlich';
        if (!formData.company.trim()) newErrors.company = 'Unternehmen ist erforderlich';
        break;
      case 2:
        if (!formData.location.trim()) newErrors.location = 'Standort ist erforderlich';
        if (!formData.website.trim()) newErrors.website = 'Website ist erforderlich';
        break;
      case 3:
        if (!formData.expectedVolume.trim()) newErrors.expectedVolume = 'Erwartetes Volumen ist erforderlich';
        break;
      case 4:
        if (!formData.consent) newErrors.consent = 'Sie müssen der Datenverarbeitung zustimmen';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep) && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep(4)) {
      // Hier würde die Formular-Daten verarbeitet werden
      console.log('Formular abgesendet:', formData);
      setIsSubmitted(true);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Kontaktdaten</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vorname *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-gray-900 ${
                    errors.firstName 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nachname *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-gray-900 ${
                    errors.lastName 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  E-Mail *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-gray-900 ${
                    errors.email 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-gray-900 ${
                    errors.phone 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Unternehmen *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => handleInputChange('company', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-gray-900 ${
                  errors.company 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-blue-500'
                }`}
              />
              {errors.company && (
                <p className="mt-1 text-sm text-red-600">{errors.company}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Unternehmensdetails</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Art des Unternehmens
                </label>
                <input
                  type="text"
                  value="KFZ-Gutachter"
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                />
                <p className="mt-1 text-sm text-gray-500">Nur für KFZ-Gutachter verfügbar</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mitarbeiteranzahl
                </label>
                <select
                  value={formData.employeeCount}
                  onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm hover:border-gray-400 transition-colors duration-200 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px 16px',
                    paddingRight: '40px'
                  }}
                >
                  <option value="">Bitte wählen</option>
                  <option value="1-5">1-5 Mitarbeiter</option>
                  <option value="6-20">6-20 Mitarbeiter</option>
                  <option value="21-50">21-50 Mitarbeiter</option>
                  <option value="51+">51+ Mitarbeiter</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Standort *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="Stadt, Bundesland"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-gray-900 ${
                    errors.location 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.location && (
                  <p className="mt-1 text-sm text-red-600">{errors.location}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website *
                </label>
                <input
                  type="url"
                  required
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://..."
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent text-gray-900 ${
                    errors.website 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                />
                {errors.website && (
                  <p className="mt-1 text-sm text-red-600">{errors.website}</p>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Partnerschaftsdetails</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Art der Partnerschaft
                </label>
                <input
                  type="text"
                  value="Empfehlungspartnerschaft"
                  disabled
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                />
                <p className="mt-1 text-sm text-gray-500">Nur für KFZ-Gutachter geeignet</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Erwartetes Volumen (Fälle/Monat) *
                </label>
                <select
                  required
                  value={formData.expectedVolume}
                  onChange={(e) => handleInputChange('expectedVolume', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent bg-white shadow-sm hover:border-gray-400 transition-colors duration-200 appearance-none cursor-pointer ${
                    errors.expectedVolume 
                      ? 'border-red-500 focus:ring-red-500' 
                      : 'border-gray-300 focus:ring-blue-500'
                  }`}
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px 16px',
                    paddingRight: '40px'
                  }}
                >
                  <option value="">Bitte wählen</option>
                  <option value="1-10">1-10 Fälle</option>
                  <option value="11-50">11-50 Fälle</option>
                  <option value="51-100">51-100 Fälle</option>
                  <option value="100+">100+ Fälle</option>
                </select>
                {errors.expectedVolume && (
                  <p className="mt-1 text-sm text-red-600">{errors.expectedVolume}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Erfahrung im Verkehrsrecht
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white shadow-sm hover:border-gray-400 transition-colors duration-200 appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
                    backgroundPosition: 'right 12px center',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: '16px 16px',
                    paddingRight: '40px'
                  }}
                >
                  <option value="">Bitte wählen</option>
                  <option value="beginner">Einsteiger</option>
                  <option value="intermediate">Erfahren</option>
                  <option value="expert">Experte</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ihre Ziele mit der Partnerschaft
                </label>
                <textarea
                  value={formData.goals}
                  onChange={(e) => handleInputChange('goals', e.target.value)}
                  rows={4}
                  placeholder="Beschreiben Sie kurz Ihre Ziele und Erwartungen..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                />
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">Zusätzliche Informationen</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Weitere Nachrichten
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                rows={6}
                placeholder="Haben Sie noch weitere Fragen oder möchten Sie uns etwas mitteilen?"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
              />
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent"
                required
                checked={formData.consent}
                onChange={(e) => handleInputChange('consent', e.target.checked)}
                className={`mt-1 h-4 w-4 focus:ring-2 border-gray-300 rounded ${
                  errors.consent 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'text-blue-600 focus:ring-blue-500'
                }`}
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                <a href="/legal/datenschutz" className="text-blue-600 hover:underline">
                  Datenschutzerklärung
                </a>{' '}
                zu und möchte über Partnerschaftsmöglichkeiten informiert werden. *
              </label>
            </div>
            {errors.consent && (
              <p className="mt-1 text-sm text-red-600">{errors.consent}</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <Section className="py-16" style={{ background: 'white' }}>
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <div className="mb-6">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Partnerschaftsanfrage erfolgreich abgesendet!
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Vielen Dank für Ihr Interesse an einer Partnerschaft mit Rechtly.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Was passiert als nächstes?</h3>
              <div className="space-y-3 text-left">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">1</span>
                  </div>
                  <p className="text-blue-800">Sie erhalten eine Bestätigungs-E-Mail an <strong>{formData.email}</strong></p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">2</span>
                  </div>
                  <p className="text-blue-800">Unser Team prüft Ihre Anfrage innerhalb von 24 Stunden</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">3</span>
                  </div>
                  <p className="text-blue-800">Wir kontaktieren Sie telefonisch für ein persönliches Gespräch</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Ihre Anfrage im Überblick:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Name:</strong> {formData.firstName} {formData.lastName}</p>
                <p><strong>Unternehmen:</strong> {formData.company}</p>
                <p><strong>Standort:</strong> {formData.location}</p>
                <p><strong>Partnerschaft:</strong> Empfehlungspartnerschaft für KFZ-Gutachter</p>
              </div>
            </div>

            <div className="mt-8">
              <button
                onClick={() => window.location.href = '/'}
                className="px-8 py-3 text-white rounded-lg font-medium transition-colors"
                style={{ background: 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #B8D60A 0%, #7BA842 100%)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)';
                }}
              >
                Zurück zur Startseite
              </button>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section className="py-16" style={{ background: 'white' }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Stepper Navigation */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`relative flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? 'text-white border-transparent'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                  style={currentStep >= step.id ? { background: 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)' } : {}}
                >
                  {currentStep > step.id ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    <span className="absolute inset-0 flex items-center justify-center font-semibold">
                      {step.id}
                    </span>
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step.id ? '' : 'bg-gray-300'
                    }`}
                    style={currentStep > step.id ? { background: 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)' } : {}}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <div key={step.id} className="text-center flex-1">
                <div className="text-sm font-medium text-gray-700">{step.title}</div>
                <div className="text-xs text-gray-500">{step.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="rounded-2xl px-4 md:px-8 py-16 bg-white shadow-lg" style={{ background: 'white' }}>
          <form onSubmit={handleSubmit}>
            {renderStepContent()}
            
            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-lg font-medium ${
                  currentStep === 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Zurück
              </button>
              
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="px-6 py-3 text-white rounded-lg font-medium transition-colors"
                  style={{ background: 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #B8D60A 0%, #7BA842 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)';
                  }}
                >
                  Weiter
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 text-white rounded-lg font-medium transition-colors"
                  style={{ background: 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #B8D60A 0%, #7BA842 100%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'linear-gradient(135deg, #C7E70C 0%, #8BC34A 100%)';
                  }}
                >
                  Partnerschaftsanfrage absenden
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </Section>
  );
}
