import React from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Card = ({ children, className, title, subtitle }: CardProps) => (
  <div className={cn("glass rounded-2xl p-6 flex flex-col gap-4", className)}>
    {(title || subtitle) && (
      <div className="flex flex-col gap-1">
        {title && <h3 className="text-lg font-bold tracking-tight">{title}</h3>}
        {subtitle && <p className="text-xs text-gray-400 font-mono uppercase tracking-wider">{subtitle}</p>}
      </div>
    )}
    {children}
  </div>
);
