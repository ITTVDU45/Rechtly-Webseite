import React, { ReactNode } from 'react';
import './Card.css';

type CardProps = {
  children: ReactNode;
  className?: string;
};

export const Card = ({ children, className = '' }: CardProps) => (
  <div className={`card ${className}`}>{children}</div>
);

export const CardHeader = ({ children, className = '' }: CardProps) => (
  <div className={`card-header ${className}`}>{children}</div>
);

export const CardContent = ({ children, className = '' }: CardProps) => (
  <div className={`card-content ${className}`}>{children}</div>
);

export const CardTitle = ({ children, className = '' }: CardProps) => (
  <h3 className={`card-title ${className}`}>{children}</h3>
);

export const CardDescription = ({ children, className = '' }: CardProps) => (
  <p className={`card-description ${className}`}>{children}</p>
);

export default Card;


