# Rechtly Website

Eine moderne, responsive Website für Rechtly, entwickelt mit Next.js 15, React 19 und TypeScript.

## Features

- **Next.js 15 App Router**: Moderne Routing-Struktur mit Server Components
- **React 19**: Neueste React-Features
- **TypeScript**: Vollständig typisiert für bessere Entwicklererfahrung
- **Tailwind CSS**: Utility-first CSS-Framework für schnelles Styling
- **Responsive Design**: Optimiert für alle Gerätetypen
- **Glassmorphism Design**: Moderne UI mit Glaseffekten
- **Animationen**: Subtile Animationen für eine bessere Benutzererfahrung
- **SEO-optimiert**: Metadaten und strukturierte Daten
- **Barrierefreiheit**: WCAG-konforme Implementierung

## Projektstruktur

```
/app
  /(marketing)
    page.tsx
    layout.tsx
    opengraph-image.tsx
    twitter-image.tsx
  /api
    /callback/route.ts
  /legal
    datenschutz/page.tsx
    impressum/page.tsx
/components
  Hero.tsx
  TrustLogos.tsx
  FeatureSplit.tsx
  UseCases.tsx
  Benefits.tsx
  HowItWorks.tsx
  FeaturesGrid.tsx
  CTA.tsx
  Pricing.tsx
  Testimonials.tsx
  FAQ.tsx
  Footer.tsx
/lib
  validations.ts
  animations.ts
  ui.tsx
/styles
  globals.css
/tailwind.config.ts
```

## Setup

1. **Klonen des Repositories**
   ```bash
   git clone https://github.com/ITTVDU45/Rechtly-Webseite.git
   cd rechtly-nextjs
   ```

2. **Installieren der Abhängigkeiten**
   ```bash
   npm install
   ```

3. **Umgebungsvariablen einrichten**
   Kopiere `.env.example` zu `.env.local` und füge die erforderlichen Werte ein:
   ```bash
   cp .env.example .env.local
   ```

4. **Entwicklungsserver starten**
   ```bash
   npm run dev
   ```

5. **Produktion-Build erstellen**
   ```bash
   npm run build
   ```

## Deployment

Die Website ist für das Deployment auf Vercel optimiert. Verbinde einfach das GitHub-Repository mit deinem Vercel-Account und folge den Anweisungen.

## Lizenz

Alle Rechte vorbehalten © Rechtly GmbH