"use client";
import React from 'react';
import './upload-handler.css';

type Props = { progress: number };

export default function UploadProgress({ progress }: Props) {
  return (
    <div className="upload-progress">
      <div className="upload-progress-bar" style={{ width: `${progress}%` }}>
        <span className="upload-progress-text">{progress}%</span>
      </div>
    </div>
  );
}


