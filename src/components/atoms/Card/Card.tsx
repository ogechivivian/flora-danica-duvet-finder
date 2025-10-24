import React from 'react';
import './Card.css';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'highlighted' | 'comparison';
  onClick?: () => void;
  'aria-label'?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  variant = 'default',
  onClick,
  'aria-label': ariaLabel,
}) => {
  const Component = onClick ? 'button' : 'div';
  
  return (
    <Component
      className={`card card--${variant} ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      {children}
    </Component>
  );
};