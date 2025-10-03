import React from 'react';

export default function ContactMap(): JSX.Element {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-md bg-white h-72">
      {/* Simple OpenStreetMap iframe - replace with interactive map if API keys available */}
      <iframe
        title="Rechtly Standort"
        src="https://www.openstreetmap.org/export/embed.html?bbox=7.0026690%2C51.4344817%2C7.0032205%2C51.4348279&layer=mapnik&marker=51.4346615%2C7.0029347"
        className="w-full h-full border-0"
      />
    </div>
  );
}


