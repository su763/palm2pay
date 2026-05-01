'use client';

import React from 'react';
import { colors, borderRadius } from '@/lib/theme';

type BadgeVariant = 'default' | 'success' | 'error' | 'warning' | 'info' | 'indigo';
type BadgeSize = 'sm' | 'md' | 'lg';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
}) => {
  const baseStyles = `
    inline-flex items-center gap-1.5 rounded-full font-semibold
  `;

  const variantStyles = {
    default: 'bg-gray-100 text-gray-700',
    success: `bg-[${colors.success[50]}] text-[${colors.success[700]}]`,
    error: `bg-[${colors.error[50]}] text-[${colors.error[700]}]`,
    warning: `bg-[${colors.warning[50]}] text-[${colors.warning[700]}]`,
    info: `bg-[${colors.info[50]}] text-[${colors.info[700]}]`,
    indigo: `bg-[${colors.indigo[50]}] text-[${colors.indigo[700]}]`,
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };

  return (
    <span className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}>
      {icon && <span className="w-3 h-3">{icon}</span>}
      {children}
    </span>
  );
};

export const StatusDot: React.FC<{ status: 'online' | 'offline' | 'error' | 'warning' }> = ({
  status,
}) => {
  const colors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
  };

  return (
    <span className={`inline-block w-2.5 h-2.5 rounded-full ${colors[status]} ${status === 'online' ? 'animate-pulse' : ''}`} />
  );
};
