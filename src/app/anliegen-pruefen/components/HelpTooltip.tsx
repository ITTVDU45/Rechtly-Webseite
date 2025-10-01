"use client";
import React from 'react';

type Props = { text: string };

export default function HelpTooltip({ text }: Props) {
  return (
    <div className="tooltip">
      <span className="help-icon">?</span>
      <span className="tooltip-text">{text}</span>
    </div>
  );
}


