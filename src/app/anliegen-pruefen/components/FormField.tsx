"use client";
import React from 'react';
import LiveValidation from './LiveValidation';
import './FormField.css';

type ValidationRule = { validate: (v: any) => boolean; message: string };

type Props = {
  label: string;
  id: string;
  type?: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  validationRules?: ValidationRule[];
  helpText?: string;
};

export default function FormField({ label, id, type = 'text', value, onChange, required = false, validationRules = [], helpText }: Props) {
  return (
    <div className="form-field">
      <label htmlFor={id}>{label}{required && <span className="required" aria-label="Pflichtfeld">*</span>}</label>
      {helpText && <span className="help-text" id={`${id}-help`}>{helpText}</span>}
      <input type={type} id={id} value={value} onChange={onChange} required={required} aria-required={required} aria-describedby={helpText ? `${id}-help` : undefined} aria-invalid={validationRules && validationRules.length > 0 ? !validationRules.every(r => r.validate(value)) : undefined} />
      <LiveValidation value={value} validationRules={validationRules} />
    </div>
  );
}


