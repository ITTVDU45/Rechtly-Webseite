"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/ui/Section';

export default function InfoBrochureForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    email: '',
    phone: '',
    message: '',
    agbAccepted: false,
    privacyAccepted: false,
    newsletterAccepted: false
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hier würde später der API-Call erfolgen
    alert('Vielen Dank! Ihre Anfrage wurde gesendet. Sie erhalten die Infobroschüre in Kürze.');
    // Formular zurücksetzen
    setFormData({
      firstName: '',
      lastName: '',
      company: '',
      email: '',
      phone: '',
      message: '',
      agbAccepted: false,
      privacyAccepted: false,
      newsletterAccepted: false
    });
  };

  return (
    <Section id="infobroschure" className="py-20 sm:py-16" style={{ background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)' }}>
      <div className="flex flex-col md:flex-row items-center gap-10">
        <motion.div 
          className="md:w-1/2 text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold">Ihre Gutachter-Infobroschüre</h2>
          <p className="mt-4 text-white/90">
            Erfahren Sie mehr über die Vorteile einer Partnerschaft mit Rechtly. 
            Unsere Infobroschüre enthält alle Details zu Provisionen, Abläufen und der digitalen Plattform.
          </p>
          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13l4 4L19 7" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Detaillierte Provisionsübersicht</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13l4 4L19 7" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Schritt-für-Schritt Onboarding</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white/10 p-2 rounded-full">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 13l4 4L19 7" stroke="#a3e635" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span>Erklärung der digitalen Plattform</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="md:w-1/2 w-full"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <form 
            onSubmit={handleSubmit} 
            className="bg-white/10 backdrop-blur-sm p-6 md:p-8 rounded-xl shadow-lg"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-white/90 mb-1">Vorname *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#a3e635]/40"
                  placeholder="Vorname"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-white/90 mb-1">Nachname *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#a3e635]/40"
                  placeholder="Nachname"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="company" className="block text-sm font-medium text-white/90 mb-1">Gutachterfirma *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#a3e635]/40"
                placeholder="Name Ihrer Firma/Praxis"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/90 mb-1">E-Mail *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full p-3 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#a3e635]/40"
                  placeholder="email@beispiel.de"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-white/90 mb-1">Telefon</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#a3e635]/40"
                  placeholder="Optional"
                />
              </div>
            </div>

            <div className="mt-4">
              <label htmlFor="message" className="block text-sm font-medium text-white/90 mb-1">Nachricht</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={3}
                className="w-full p-3 rounded-md bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#a3e635]/40"
                placeholder="Ihre Fragen oder Anmerkungen (optional)"
              ></textarea>
            </div>

            <div className="mt-6 space-y-3">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="agbAccepted"
                  name="agbAccepted"
                  checked={formData.agbAccepted}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4"
                />
                <label htmlFor="agbAccepted" className="ml-2 block text-sm text-white/80">
                  Ich akzeptiere die <a href="/agb" className="text-[#a3e635] hover:underline">AGB</a> *
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="privacyAccepted"
                  name="privacyAccepted"
                  checked={formData.privacyAccepted}
                  onChange={handleChange}
                  required
                  className="mt-1 h-4 w-4"
                />
                <label htmlFor="privacyAccepted" className="ml-2 block text-sm text-white/80">
                  Ich akzeptiere die <a href="/datenschutz" className="text-[#a3e635] hover:underline">Datenschutzerklärung</a> *
                </label>
              </div>
              
              <div className="flex items-start">
                <input
                  type="checkbox"
                  id="newsletterAccepted"
                  name="newsletterAccepted"
                  checked={formData.newsletterAccepted}
                  onChange={handleChange}
                  className="mt-1 h-4 w-4"
                />
                <label htmlFor="newsletterAccepted" className="ml-2 block text-sm text-white/80">
                  Ich möchte den Newsletter mit Gutachter-Updates erhalten
                </label>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full rounded-xl py-3 font-semibold transition-all duration-300 shadow-sm"
                style={{ background: 'linear-gradient(135deg, #c7e70c 0%, #a3e635 100%)' }}
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
                  Infobroschüre anfordern
                </span>
              </button>
              <p className="mt-3 text-xs text-white/60 text-center">* Pflichtfelder</p>
            </div>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}
