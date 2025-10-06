import "./globals.css";
import { Inter } from "next/font/google";
import siteMetadata from "@/utils/siteMetaData";
import Script from "next/script";
import { ReactNode } from "react";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL(siteMetadata.siteUrl),
  title: {
    template: `%s | ${siteMetadata.title}`,
    default: siteMetadata.title,
  },
  description: siteMetadata.description,
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    siteName: siteMetadata.title,
    images: [siteMetadata.socialBanner],
    locale: "de_DE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    images: [siteMetadata.socialBanner],
  },
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="de">
      <body
        className={inter.className}
      >
        <Script id="theme-switcher" strategy="afterInteractive">
          {`try {
    if (typeof window !== 'undefined' && window.localStorage) {
      if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  } catch (e) {
    // Fallback: no dark mode if localStorage is not available
    document.documentElement.classList.remove('dark')
  }`}
        </Script>
        {children}
      </body>
    </html>
  );
}
