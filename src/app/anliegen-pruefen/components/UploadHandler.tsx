"use client";
import React, { useState, useMemo, useRef, useEffect } from 'react';
import UploadProgress from './UploadProgress';
import { compressAndValidateImage } from './image-compressor';
import './upload-handler.css';

type Props = {
  onUpload: (file: File) => Promise<void>;
  onError: (msg: string) => void;
  maxFiles?: number;
  acceptedTypes?: string;
};

export default function UploadHandler({ onUpload, onError, maxFiles = 5, acceptedTypes = 'image/*' }: Props) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files) return;
    const fileArray = Array.from(files);
    if (fileArray.length > maxFiles) { onError(`Maximal ${maxFiles} Dateien erlaubt`); return; }

    setUploading(true);
    for (let i = 0; i < fileArray.length; i++) {
      try {
        const file = fileArray[i];
        setProgress(Math.round((i / fileArray.length) * 100));
        const compressedFile = await compressAndValidateImage(file);
        // simulate upload delay
        await new Promise(r => setTimeout(r, 400));
        await onUpload(compressedFile);
      } catch (err: any) {
        onError(err?.message || 'Upload failed');
        break;
      }
    }

    setProgress(100);
    setTimeout(() => { setUploading(false); setProgress(0); }, 800);
  };

  const baseId = useMemo(() => Math.random().toString(36).slice(2,8), []);

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(t => t.stop());
      }
    };
  }, []);

  const openCamera = async () => {
    try {
      if (typeof navigator !== 'undefined' && navigator.mediaDevices && typeof navigator.mediaDevices.getUserMedia === 'function') {
        const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        streamRef.current = s;
        if (videoRef.current) {
          videoRef.current.srcObject = s;
          await videoRef.current.play();
        }
        setCameraError(null);
        setShowCamera(true);
        return;
      }

      // Fallback: create a file input with capture attribute (works on many mobile browsers)
      const captureInput = document.createElement('input');
      (captureInput as any).type = 'file';
      (captureInput as any).accept = acceptedTypes || 'image/*';
      try { (captureInput as any).capture = 'environment'; } catch (e) { /* ignore */ }
      captureInput.onchange = () => handleFiles(captureInput.files);
      captureInput.click();
    } catch (err: any) {
      const msg = err?.message || 'Kamera konnte nicht geöffnet werden';
      setCameraError(msg);
      onError(msg);
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (videoRef.current) videoRef.current.pause();
    setShowCamera(false);
    setCameraError(null);
  };

  const capturePhoto = async () => {
    try {
      if (!videoRef.current) return;
      const v = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = v.videoWidth || 1280;
      canvas.height = v.videoHeight || 720;
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas not supported');
      ctx.drawImage(v, 0, 0, canvas.width, canvas.height);
      const blob = await new Promise<Blob | null>(resolve => canvas.toBlob(b => resolve(b), 'image/jpeg', 0.9));
      if (!blob) throw new Error('Capture failed');
      const file = new File([blob], `photo-${Date.now()}.jpg`, { type: 'image/jpeg' });
      const compressed = await compressAndValidateImage(file);
      await onUpload(compressed);
      closeCamera();
    } catch (e: any) {
      onError(e?.message || 'Fehler beim Fotografieren');
    }
  };

  return (
    <div className="upload-handler">
      <label className="upload-button" htmlFor={`file-input-${baseId}`}>
        Datei auswählen
      </label>
      <input id={`file-input-${baseId}`} type="file" multiple accept={acceptedTypes} onChange={(e) => handleFiles(e.target.files)} className="file-input" />

      <button type="button" className="camera-button" onClick={openCamera}>Jetzt Foto erstellen</button>

      
      {uploading && <UploadProgress progress={progress} />}

      {showCamera && (
        <div className="camera-modal" role="dialog" aria-modal="true">
          <div className="camera-panel">
            <video ref={videoRef as any} className="camera-view" playsInline muted autoPlay />
            <div className="camera-controls camera-actions">
              <button onClick={capturePhoto}>Foto machen</button>
              <button onClick={closeCamera}>Abbrechen</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}



