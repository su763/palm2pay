'use client';

import React, { forwardRef } from 'react';
import { colors, borderRadius, typography } from '@/lib/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, leftElement, rightElement, className = '', ...props }, ref) => {
    const baseStyles = `
      w-full px-4 py-3 text-[${colors.text.primary}] bg-white
      border rounded-lg transition-all duration-200
      placeholder:text-[${colors.text.muted}]
      focus:outline-none focus:ring-2 focus:ring-[${colors.indigo[500]}] focus:border-transparent
      disabled:bg-[${colors.background.secondary}] disabled:cursor-not-allowed
    `;

    const errorStyles = error
      ? `border-[${colors.error[500]}] focus:ring-[${colors.error[500]}]`
      : `border-[${colors.border.default}]`;

    const iconStyles = icon || leftElement ? 'pl-11' : '';
    const rightElementStyles = rightElement ? 'pr-11' : '';

    return (
      <div className="w-full">
        {label && (
          <label className={`block text-sm font-medium text-[${colors.text.secondary}] mb-2`}>
            {label}
          </label>
        )}
        <div className="relative">
          {(icon || leftElement) && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[${colors.text.muted}]">
              {icon || leftElement}
            </div>
          )}
          <input
            ref={ref}
            className={`${baseStyles} ${errorStyles} ${iconStyles} ${rightElementStyles} ${className}`}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[${colors.text.muted}]">
              {rightElement}
            </div>
          )}
        </div>
        {error && <p className={`mt-1 text-sm text-[${colors.error[500]}]`}>{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export const TextArea = forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label?: string; error?: string }>(
  ({ label, error, className = '', ...props }, ref) => {
    const baseStyles = `
      w-full px-4 py-3 text-[${colors.text.primary}] bg-white
      border rounded-lg transition-all duration-200
      placeholder:text-[${colors.text.muted}]
      focus:outline-none focus:ring-2 focus:ring-[${colors.indigo[500]}] focus:border-transparent
      disabled:bg-[${colors.background.secondary}] disabled:cursor-not-allowed
    `;

    const errorStyles = error
      ? `border-[${colors.error[500]}] focus:ring-[${colors.error[500]}]`
      : `border-[${colors.border.default}]`;

    return (
      <div className="w-full">
        {label && (
          <label className={`block text-sm font-medium text-[${colors.text.secondary}] mb-2`}>
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${className}`}
          {...props}
        />
        {error && <p className={`mt-1 text-sm text-[${colors.error[500]}]`}>{error}</p>}
      </div>
    );
  }
);

TextArea.displayName = 'TextArea';
