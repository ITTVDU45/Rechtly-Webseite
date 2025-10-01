"use client";
import React, { useState, useEffect } from 'react';
import './LiveValidation.css';

type ValidationRule = {
  validate: (v: any) => boolean;
  message: string;
};

type Props = {
  value: any;
  validationRules?: ValidationRule[];
  onValidation?: (isValid: boolean) => void;
};

export default function LiveValidation({ value, validationRules = [], onValidation }: Props) {
  const [errors, setErrors] = useState<string[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (isDirty) {
      const newErrors: string[] = [];
      validationRules.forEach(rule => {
        try {
          if (!rule.validate(value)) newErrors.push(rule.message);
        } catch (e) {
          // ignore rule errors
        }
      });
      setErrors(newErrors);
      onValidation?.(newErrors.length === 0);
    }
  }, [value, isDirty, validationRules, onValidation]);

  // mark dirty on first render when value changes
  useEffect(() => { setIsDirty(true); }, []);

  if (!isDirty || errors.length === 0) return <div className="validation-container" />;

  return (
    <div className="validation-container">
      <ul className="validation-errors" role="alert">
        {errors.map((err, i) => (
          <li key={i} className="validation-error">{err}</li>
        ))}
      </ul>
    </div>
  );
}


