"use client";
import React from 'react';

type AccessibilityWrapperProps = {
  children: React.ReactNode;
  labelledBy?: string;
  describedBy?: string;
  role?: string;
};

export default function AccessibilityWrapper({ children, labelledBy, describedBy, role = 'form' }: AccessibilityWrapperProps) {
  return (
    <div role={role} aria-labelledby={labelledBy} aria-describedby={describedBy}>
      {children}
    </div>
  );
}


