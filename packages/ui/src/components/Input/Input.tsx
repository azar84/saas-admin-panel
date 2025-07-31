import React from 'react';
import { cn, createVariants } from '@saas-admin/design-system';

const inputVariants = createVariants({
  variant: {
    default: 'border-medium focus:border-primary focus:ring-primary',
    error: 'border-error focus:border-error focus:ring-error',
    success: 'border-success focus:border-success focus:ring-success',
  },
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-3 text-lg',
  },
});

export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  variant?: 'default' | 'error' | 'success';
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', size = 'md', label, error, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    
    const baseClasses = cn(
      'block w-full rounded-lg border bg-bg-secondary shadow-sm',
      'placeholder:text-placeholder',
      'focus:outline-none focus:ring-2 focus:ring-offset-0',
      'disabled:bg-bg-secondary disabled:cursor-not-allowed',
      inputVariants({ variant: error ? 'error' : variant, size, className })
    );

    return (
      <div className="space-y-1">
        {label && (
          <label htmlFor={inputId} className="block text-sm font-medium text-body">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={baseClasses}
          {...props}
        />
        {error && (
          <p className="text-sm text-error">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-placeholder">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input'; 