import React from 'react';
import { cn, createVariants } from '@saas-admin/design-system';

const buttonVariants = createVariants({
  variant: {
    primary: 'bg-primary text-white hover:bg-primary focus:ring-primary',
    secondary: 'bg-secondary text-white hover:bg-secondary focus:ring-secondary',
    tertiary: 'bg-tertiary text-white hover:bg-tertiary focus:ring-tertiary',
    outline: 'border border-medium bg-bg-secondary text-body hover:bg-bg-tertiary focus:ring-primary',
    ghost: 'text-body hover:bg-bg-secondary focus:ring-medium',
    danger: 'bg-error text-white hover:bg-error focus:ring-error',
  },
  size: {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  },
});

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, disabled, children, ...props }, ref) => {
    const baseClasses = cn(
      'inline-flex items-center justify-center font-medium rounded-lg transition-colors',
      'focus:outline-none focus:ring-2 focus:ring-offset-2',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      buttonVariants({ variant, size, className })
    );

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button'; 