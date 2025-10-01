import React from 'react';

export default function ContactMap(): JSX.Element {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-md bg-white h-72">
      {/* Simple OpenStreetMap iframe - replace with interactive map if API keys available */}
      <iframe
        title="Rechtly Standort"
        src="https://www.openstreetmap.org/export/embed.html?bbox=13.404954%2C52.520008%2C13.404954%2C52.520008&layer=mapnik"
        className="w-full h-full border-0"
      />
    </div>
  );
}


