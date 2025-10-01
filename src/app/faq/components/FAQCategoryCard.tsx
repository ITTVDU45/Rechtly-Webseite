import React from 'react';

type Props = { id: string; title: string; icon?: string };

export default function FAQCategoryCard({ id, title, icon }: Props) {
  // This card is decorative in the lower grid; anchors live in the hero only.
  return (
    <div className="rounded-xl bg-white p-4 text-center shadow-sm">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="font-semibold">{title}</div>
    </div>
  );
}
