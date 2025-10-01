"use client";
import React, { useState, useEffect } from 'react';
import { useAutoSave } from '../hooks/useAutoSave';
import { loadJSON, removeJSON } from '../lib/localStorage';

export default function UseAutoSaveExample() {
  const [value, setValue] = useState(() => loadJSON('anliegen-draft') || '');
  const { scheduleSave } = useAutoSave('anliegen-draft', () => value, 800);

  useEffect(() => { scheduleSave(); }, [value, scheduleSave]);

  return (
    <div>
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Autosave example" />
      <div><button onClick={() => { removeJSON('anliegen-draft'); setValue(''); }}>Clear draft</button></div>
    </div>
  );
}


