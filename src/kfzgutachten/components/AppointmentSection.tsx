"use client";
import React, { useState } from 'react';
import Section from '@/components/ui/Section';

export default function AppointmentSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', vehicle: '', damage: '', date: '' });

  const update = (k: string, v: string) => setForm((s) => ({ ...s, [k]: v }));
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Termin angefragt', form);
    alert('Termin-Anfrage gesendet (Demo)');
  };

  return (
    <Section className="py-12">
      <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow">
        <h3 className="text-xl font-semibold text-slate-800">Termin mit dem Gutachter vereinbaren</h3>
        <p className="text-slate-600">Wähle einen Wunschzeitraum und wir melden uns zur Bestätigung.</p>

        <form onSubmit={submit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input className="p-3 rounded-lg border" placeholder="Name" value={form.name} onChange={(e) => update('name', e.target.value)} />
          <input className="p-3 rounded-lg border" placeholder="E-Mail" value={form.email} onChange={(e) => update('email', e.target.value)} />
          <input className="p-3 rounded-lg border" placeholder="Telefon" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
          <input className="p-3 rounded-lg border" placeholder="Fahrzeug (z.B. VW Golf, 2018)" value={form.vehicle} onChange={(e) => update('vehicle', e.target.value)} />

          <textarea className="p-3 rounded-lg border md:col-span-2" placeholder="Schadenbeschreibung" value={form.damage} onChange={(e) => update('damage', e.target.value)} />

          <input type="date" className="p-3 rounded-lg border" value={form.date} onChange={(e) => update('date', e.target.value)} />

          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="rounded-2xl bg-teal-600 text-white px-6 py-2">Termin vereinbaren</button>
          </div>
        </form>
      </div>
    </Section>
  );
}
