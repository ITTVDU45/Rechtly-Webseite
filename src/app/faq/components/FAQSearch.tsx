"use client";
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { faqItems } from '../data';

type Category = { id: string; title: string; icon?: string };

type QuestionEntry = { id: string; q: string; categoryId: string; categoryTitle: string };

type Props = { categories: Category[] };

export default function FAQSearch({ categories }: Props) {
  const [query, setQuery] = useState('');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<QuestionEntry[]>([]);
  const [open, setOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);

  const MIN_QUERY = 2;

  const allQuestions = useMemo(() => {
    const out: QuestionEntry[] = [];
    for (const catId of Object.keys(faqItems)) {
      const list = faqItems[catId] ?? [];
      const cat = categories.find((c) => c.id === catId);
      const catTitle = cat?.title ?? catId;
      list.forEach((it, i) => out.push({ id: `${catId}-q-${i}`, q: it.q, categoryId: catId, categoryTitle: catTitle }));
    }
    return out;
  }, [categories]);

  useEffect(() => {
    const trimmed = query.trim();
    if (!trimmed || trimmed.length < MIN_QUERY) {
      setFilteredCategories([]);
      setFilteredQuestions([]);
      setOpen(false);
      setHighlightedIndex(-1);
      return;
    }

    const q = trimmed.toLowerCase();

    // question-level matches first
    const questionResults = allQuestions.filter((qe) => qe.q.toLowerCase().includes(q));
    if (questionResults.length > 0) {
      setFilteredQuestions(questionResults);
      setFilteredCategories([]);
      setOpen(true);
      setHighlightedIndex(-1);
      return;
    }

    // fallback to category matches
    const categoryResults = categories.filter((c) => c.title.toLowerCase().includes(q));
    setFilteredCategories(categoryResults);
    setFilteredQuestions([]);
    setOpen(categoryResults.length > 0);
    setHighlightedIndex(-1);
  }, [query, categories, allQuestions]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!inputRef.current) return;
      if (e.target instanceof Node && !inputRef.current.contains(e.target) && !listRef.current?.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  function goTo(id: string) {
    setOpen(false);
    setQuery('');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // slight nudge in case of fixed header
      window.setTimeout(() => window.scrollBy(0, -88), 300);
    }
  }

  function highlightText(text: string, q: string) {
    if (!q) return text;
    const lower = text.toLowerCase();
    const idx = lower.indexOf(q.toLowerCase());
    if (idx === -1) return text;
    const before = text.slice(0, idx);
    const match = text.slice(idx, idx + q.length);
    const after = text.slice(idx + q.length);
    const gradientStyle: React.CSSProperties = {
      background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)',
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      color: 'transparent'
    };
    return (
      <>
        {before}
        <span className="bg-sky-100 px-1 rounded">
          <span style={gradientStyle}>{match}</span>
        </span>
        {after}
      </>
    );
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    const total = filteredQuestions.length > 0 ? filteredQuestions.length : filteredCategories.length;
    if (!open && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      if (total > 0) {
        setOpen(true);
        setHighlightedIndex(0);
        e.preventDefault();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev >= total - 1 ? 0 : prev + 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) => (prev <= 0 ? Math.max(0, total - 1) : prev - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (highlightedIndex >= 0 && highlightedIndex < total) {
        if (filteredQuestions.length > 0) {
          goTo(filteredQuestions[highlightedIndex].id);
        } else {
          goTo(filteredCategories[highlightedIndex].id);
        }
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <label htmlFor="faq-search" className="sr-only">FAQ suchen</label>
      <div className="relative">
        <input
          id="faq-search"
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query && query.length >= MIN_QUERY && setOpen(filteredQuestions.length > 0 || filteredCategories.length > 0)}
          onKeyDown={onKeyDown}
          placeholder="Stichwort eingeben (z. B. Punkte, Bußgeld, Unfall)"
          className="w-full rounded-2xl px-6 py-4 text-slate-900 placeholder:text-slate-400 shadow-inner focus:outline-none text-lg"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls="faq-search-list"
          aria-activedescendant={highlightedIndex >= 0 ? `faq-search-option-${highlightedIndex}` : undefined}
        />

        {open && (
          <ul id="faq-search-list" ref={listRef} role="listbox" className="absolute z-20 left-0 right-0 mt-2 bg-white rounded-xl shadow-lg max-h-64 overflow-auto">
            {filteredQuestions.length > 0
              ? filteredQuestions.map((q, i) => (
                  <li
                    id={`faq-search-option-${i}`}
                    key={q.id}
                    role="option"
                    aria-selected={highlightedIndex === i}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    onClick={() => goTo(q.id)}
                    className={`cursor-pointer px-4 py-3 border-b last:border-b-0 ${highlightedIndex === i ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="text-lg">🔎</div>
                        <div
                          className="font-medium"
                          style={{
                            background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)',
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            color: 'transparent'
                          }}
                        >
                          {highlightText(q.q, query)}
                        </div>
                      </div>
                      <div className="text-sm text-slate-500">{q.categoryTitle}</div>
                    </div>
                  </li>
                ))
              : filteredCategories.map((c, i) => (
                  <li
                    id={`faq-search-option-${i}`}
                    key={c.id}
                    role="option"
                    aria-selected={highlightedIndex === i}
                    onMouseEnter={() => setHighlightedIndex(i)}
                    onClick={() => goTo(c.id)}
                    className={`cursor-pointer px-4 py-3 border-b last:border-b-0 ${highlightedIndex === i ? 'bg-slate-50' : 'hover:bg-slate-50'}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-lg">{c.icon}</div>
                      <div
                        className="font-medium"
                        style={{
                          background: 'linear-gradient(135deg, #1b3a4b 0%, #2c5364 100%)',
                          WebkitBackgroundClip: 'text',
                          backgroundClip: 'text',
                          color: 'transparent'
                        }}
                      >
                        {highlightText(c.title, query)}
                      </div>
                    </div>
                  </li>
                ))}
          </ul>
        )}
      </div>
    </div>
  );
}


