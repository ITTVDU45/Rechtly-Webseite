import React, { useEffect, useState } from 'react';
import './ImagePreview.css';

type Props = {
  image: File | string | null;
  onDelete: () => void;
  title?: string;
};

export default function ImagePreview({ image, onDelete, title }: Props) {
  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    let objectUrl: string | null = null;
    if (!image) {
      setSrc('');
      return;
    }

    if (typeof image === 'string') {
      setSrc(image);
      return;
    }

    try {
      objectUrl = URL.createObjectURL(image);
      setSrc(objectUrl);
    } catch (e) {
      setSrc('');
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [image]);

  if (!image) return null;

  return (
    <div className="image-preview-container">
      <div className="image-preview-header">
        {title && <span className="image-title">{title}</span>}
        <button onClick={onDelete} className="delete-button" aria-label="Bild löschen">✕</button>
      </div>
      <div className="image-wrapper">
        {src ? <img src={src} alt={title || 'Vorschau'} className="preview-image" /> : <div className="image-missing">Vorschau nicht verfügbar</div>}
      </div>
    </div>
  );
}


