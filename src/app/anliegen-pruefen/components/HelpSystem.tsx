"use client";
import React, { useState } from 'react';
import './HelpSystem.css';

type HelpContent = {
  title: string;
  content: string;
  tips?: string[];
};

type Props = { step: number };

export default function HelpSystem({ step }: Props) {
  const [isHelpVisible, setIsHelpVisible] = useState(false);

  const helpContent: Record<number, HelpContent> = {
    1: { title: 'Schadensart auswählen', content: 'Wählen Sie aus, ob der Schaden fremdverschuldet ist oder nicht.', tips: ['Bei Fremdverschuldung übernimmt die gegnerische Versicherung die Kosten', 'Bei Eigenschaden prüfen wir Ihre Kaskoversicherung'] }
  };

  const currentHelp = helpContent[step];

  return (
    <div className="help-system">
      <button className="help-toggle" onClick={() => setIsHelpVisible(!isHelpVisible)} aria-expanded={isHelpVisible}><span className="help-icon">?</span> Hilfe zu diesem Schritt</button>
      {isHelpVisible && currentHelp && (
        <div className="help-content" role="dialog" aria-label="Hilfe">
          <h3>{currentHelp.title}</h3>
          <p>{currentHelp.content}</p>
          {currentHelp.tips && (
            <div className="help-tips"><h4>Tipps:</h4><ul>{currentHelp.tips.map((t, i) => <li key={i}>{t}</li>)}</ul></div>
          )}
        </div>
      )}
    </div>
  );
}


