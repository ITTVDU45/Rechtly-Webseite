import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import CardNav from '@/components/ui/CardNav';
import ScrollToTop from '@/components/ui/ScrollToTop';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rechtly - Ihr Partner für Rechtsberatung & KFZ-Gutachten",
  description: "Professionelle Rechtsberatung für Bußgeld, KFZ-Gutachten und Verkehrsunfälle. Schnelle, zuverlässige Hilfe von Experten.",
  keywords: "Rechtsberatung, Bußgeld, KFZ-Gutachten, Verkehrsunfall, Anwalt, Rechtly",
  authors: [{ name: "Rechtly Team" }],
  openGraph: {
    title: "Rechtly - Ihr Partner für Rechtsberatung & KFZ-Gutachten",
    description: "Professionelle Rechtsberatung für Bußgeld, KFZ-Gutachten und Verkehrsunfälle.",
    type: "website",
    locale: "de_DE",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rechtly - Ihr Partner für Rechtsberatung & KFZ-Gutachten",
    description: "Professionelle Rechtsberatung für Bußgeld, KFZ-Gutachten und Verkehrsunfälle.",
  },
  robots: "index, follow",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <head>
        <title>Rechtly – Ihr Partner für Rechtsberatung & KFZ‑Gutachten</title>
        <meta name="description" content="Professionelle Rechtsberatung für Bußgeld, KFZ-Gutachten und Verkehrsunfälle. Schnelle, zuverlässige Hilfe von Experten." />
      </head>
      <body className={inter.className}>
        <CardNav
          logo="/assets/images/Logo.png"
          logoAlt="Rechtly"
          items={[
            {
              label: 'Leistungen',
              bgColor: '#ffffff',
              textColor: '#07222b',
              links: [
                { label: 'Bußgeld', ariaLabel: 'Bußgeld', href: '/bussgeld' },
                { label: 'Verkehrsunfall', ariaLabel: 'Verkehrsunfall', href: '/verkehrsunfall' },
                { label: 'KFZ Gutachten', ariaLabel: 'KFZ Gutachten', href: '/kfzgutachten' }
              ]
            },
            {
              label: 'Blog & Ratgeber',
              bgColor: '#ffffff',
              textColor: '#07222b',
              links: [
                { label: 'Alle Artikel', ariaLabel: 'Blog', href: '/blogundratgeber' },
                { label: 'Kategorien', ariaLabel: 'Kategorien', href: '/blogundratgeber/categories/all' }
              ]
            },
            {
              label: 'Unternehmen',
              bgColor: '#ffffff',
              textColor: '#07222b',
              links: [
                { label: 'Über uns', ariaLabel: 'Über uns', href: '/unternehmen' },
                { label: 'Partner', ariaLabel: 'Partner', href: '/partner' },
                { label: 'Für Gutachter', ariaLabel: 'Für Gutachter', href: '/partner-gutachter' },
                { label: 'Kontakt', ariaLabel: 'Kontakt', href: '/kontakt' },
                { label: 'FAQ', ariaLabel: 'FAQ', href: '/faq' }
              ]
            }
          ]}
          baseColor="#ffffff"
          menuColor="#07222b"
          buttonBgColor="#166534"
          buttonTextColor="#ffffff"
        />
        <main>{children}</main>
        <ScrollToTop />
        <Footer />
      </body>
    </html>
  );
}
