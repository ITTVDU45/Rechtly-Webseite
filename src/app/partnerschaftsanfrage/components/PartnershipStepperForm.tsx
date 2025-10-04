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
  businessType: '',
  employeeCount: '',
  location: '',
  website: '',
  partnershipType: '',
  expectedVolume: '',
  experience: '',
  goals: '',
  message: '',
  consent: false,
};

export default function PartnershipStepperForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

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
  };

  const nextStep = () => {
    if (currentStep < 4) {
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
    // Hier würde die Formular-Daten verarbeitet werden
    console.log('Formular abgesendet:', formData);
    alert('Vielen Dank für Ihre Partnerschaftsanfrage! Wir melden uns zeitnah bei Ihnen.');
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
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
                  Art des Unternehmens *
                </label>
                <select
                  required
                  value={formData.businessType}
                  onChange={(e) => handleInputChange('businessType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen</option>
                  <option value="kanzlei">Rechtsanwaltskanzlei</option>
                  <option value="gutachter">KFZ-Gutachter</option>
                  <option value="versicherung">Versicherung</option>
                  <option value="autohaus">Autohaus</option>
                  <option value="werkstatt">Werkstatt</option>
                  <option value="sonstiges">Sonstiges</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mitarbeiteranzahl
                </label>
                <select
                  value={formData.employeeCount}
                  onChange={(e) => handleInputChange('employeeCount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  placeholder="https://..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
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
                  Art der Partnerschaft *
                </label>
                <select
                  required
                  value={formData.partnershipType}
                  onChange={(e) => handleInputChange('partnershipType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen</option>
                  <option value="referral">Empfehlungspartnerschaft</option>
                  <option value="reseller">Wiederverkäufer</option>
                  <option value="integration">Technische Integration</option>
                  <option value="strategic">Strategische Partnerschaft</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Erwartetes Volumen (Fälle/Monat)
                </label>
                <select
                  value={formData.expectedVolume}
                  onChange={(e) => handleInputChange('expectedVolume', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Bitte wählen</option>
                  <option value="1-10">1-10 Fälle</option>
                  <option value="11-50">11-50 Fälle</option>
                  <option value="51-100">51-100 Fälle</option>
                  <option value="100+">100+ Fälle</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Erfahrung im Verkehrsrecht
                </label>
                <select
                  value={formData.experience}
                  onChange={(e) => handleInputChange('experience', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="consent"
                required
                checked={formData.consent}
                onChange={(e) => handleInputChange('consent', e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="consent" className="text-sm text-gray-700">
                Ich stimme der Verarbeitung meiner Daten gemäß der{' '}
                <a href="/legal/datenschutz" className="text-blue-600 hover:underline">
                  Datenschutzerklärung
                </a>{' '}
                zu und möchte über Partnerschaftsmöglichkeiten informiert werden. *
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Section className="py-16" style={{ background: 'white' }}>
      <div className="max-w-4xl mx-auto px-4">
        {/* Stepper Navigation */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    currentStep >= step.id
                      ? 'bg-blue-600 border-blue-600 text-white'
                      : 'bg-white border-gray-300 text-gray-400'
                  }`}
                >
                  {currentStep > step.id ? (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  ) : (
                    step.id
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
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
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Weiter
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors"
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
