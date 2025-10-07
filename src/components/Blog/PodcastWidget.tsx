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
    <aside className="podcast-widget">
      <div className="podcast-widget-header">
        <div className="podcast-widget-icon">
          <Image src="/assets/images/Rechtly maskottchen bild.png" alt="Podcast" width={56} height={56} />
        </div>
        <div>
          <h4 className="podcast-widget-title">{widgetHeading}</h4>
          <p className="podcast-widget-subtitle">{widgetSub}</p>
        </div>
      </div>

      <div className="space-y-3">
        {list.map((ep, idx) => (
          <div key={ep.src} className="podcast-episode">
            <div className="podcast-episode-title">{ep.title}</div>
            {ep.subtitle && <div className="podcast-episode-subtitle">{ep.subtitle}</div>}
            <div className="podcast-player">
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
        ))}
      </div>
    </aside>
  );
}


