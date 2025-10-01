"use client";
import React from 'react';
import './ConfirmDialog.css';

type ConfirmDialogProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText?: string;
  cancelText?: string;
};

export default function ConfirmDialog({ isOpen, title, message, onConfirm, onCancel, confirmText = 'Bestätigen', cancelText = 'Abbrechen' }: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="confirm-dialog-overlay">
      <div className="confirm-dialog">
        {title && <h3>{title}</h3>}
        {message && <p>{message}</p>}
        <div className="confirm-dialog-buttons">
          <button onClick={onCancel} className="cancel-button">{cancelText}</button>
          <button onClick={onConfirm} className="confirm-button">{confirmText}</button>
        </div>
      </div>
    </div>
  );
}


