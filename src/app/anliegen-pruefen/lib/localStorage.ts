export function saveJSON(key: string, value: any) {
  try {
    if (typeof window === 'undefined') return;
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // ignore
  }
}

export function loadJSON<T = any>(key: string): T | null {
  try {
    if (typeof window === 'undefined') return null;
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch (e) {
    return null;
  }
}

export function removeJSON(key: string) {
  try { if (typeof window !== 'undefined') window.localStorage.removeItem(key); } catch (e) {}
}


