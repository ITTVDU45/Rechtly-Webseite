"use client";
import { useEffect, useRef } from 'react';
import { loadJSON, saveJSON } from '../lib/localStorage';

/**
 * useAutoSave - simple hook to autosave a value to localStorage after a debounce
 * key: storage key
 * valueRef: ref or value to save (we'll accept a getter function to read latest value)
 */
export function useAutoSave<T>(key: string, getValue: () => T, delay = 1000) {
  const timer = useRef<number | null>(null);

  useEffect(() => {
    // load initial value if present and call setter outside (consumer can call loadJSON themselves)
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  function scheduleSave() {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      try {
        const value = getValue();
        saveJSON(key, value);
      } catch (e) {
        // ignore
      }
    }, delay);
  }

  return { scheduleSave };
}


