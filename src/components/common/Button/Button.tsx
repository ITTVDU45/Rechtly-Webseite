import React, { ReactNode } from 'react';
import './Button.css';

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
};

const Button = ({ children, onClick, variant = 'primary' }: ButtonProps) => {
  return (
    <button
      className={`button button--${variant}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;


