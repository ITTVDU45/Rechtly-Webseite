import ServiceSelection from './components/ServiceSelection';
import './components/service-selection.css';

// route shortcuts to mount forms under /anliegen-pruefen/*

export const metadata = {
  title: 'Anliegen prüfen – Rechtly',
  description: 'Wählen Sie Ihr Anliegen und starten Sie die kostenfreie Ersteinschätzung.'
};

export default function AnliegenPruefenPage() {
  return (
    <main className="service-page">
      <ServiceSelection />
    </main>
  );
}


