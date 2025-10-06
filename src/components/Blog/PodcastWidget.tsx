"use client";

import Image from "next/image";
import React from "react";

interface Episode {
  src: string;
  title: string;
  subtitle?: string;
}

interface PodcastWidgetProps {
  episodes?: Episode[];
  heading?: string;
  subheading?: string;
}

export default function PodcastWidget({ episodes, heading, subheading }: PodcastWidgetProps) {
  const defaultEpisodes: Episode[] = [
    {
      src: "/assets/audio/KFZ-Gutachten_nach_Unfall__Ihre_Rechte__die_Bagatellgrenze_und_.mp3",
      title: "Podcast Rechtly - KFZ-Gutachten nach dem Unfall: Wann es sinnvoll ist und wie es abläuft",
      subtitle: "Kurzüberblick zum KFZ-Gutachten nach dem Unfall",
    },
  ];

  const list = episodes && episodes.length > 0 ? episodes : defaultEpisodes;

  const widgetHeading = heading || 'Hören Sie unseren Podcast';
  const widgetSub = subheading || 'Weiterführende Gespräche zum Thema dieses Artikels - Dieser Artikel wurde mit Unterstützung von NotebookLM (Google) und redaktionell durch das Rechtly-Team überarbeitet.';

  return (
    <aside className="mt-6">
      <div className="rounded-xl p-5 shadow-lg border border-gray-100" style={{background: 'linear-gradient(135deg,#1b3a4b 0%, rgba(27,58,75,0.95) 100%)', color: 'white'}}>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center overflow-hidden">
            {/* use Image if icon exists, otherwise show emoji */}
            <Image src="/assets/images/Rechtly maskottchen bild.png" alt="Podcast" width={56} height={56} />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-white">Hören Sie unseren Podcast</h4>
            <p className="text-sm text-gray-200">Weiterführende Gespräche zum Thema dieses Artikels - Dieser Artikel wurde mit Unterstützung von NotebookLM (Google) und redaktionell durch das Rechtly-Team überarbeitet.</p>
          </div>
        </div>

        <div className="space-y-3">
          {list.map((ep, idx) => (
            <div key={ep.src} className="flex flex-col bg-gray-50 rounded-lg p-3 border border-gray-100">
              <div className="flex items-start w-full">
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-900">{ep.title}</div>
                  {ep.subtitle && <div className="text-xs text-gray-700 mb-2">{ep.subtitle}</div>}
                  <div className="w-full">
                    <div className="bg-white rounded-md p-2">
                      <audio
                        controls
                        preload="none"
                        className="w-full"
                        src={ep.src}
                      >
                        Ihr Browser unterstützt den Audio-Player nicht.
                      </audio>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}


