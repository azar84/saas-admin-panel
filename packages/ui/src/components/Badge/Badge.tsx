import React from 'react';
import { cn, createVariants } from '@saas-admin/design-system';

const badgeVariants = createVariants({
  variant: {
    default: 'bg-bg-tertiary text-body',
    primary: 'bg-accent-1 text-primary',
    secondary: 'bg-accent-2 text-secondary',
    success: 'bg-success-bg text-success',
    warning: 'bg-warning-bg text-warning',
    error: 'bg-error-bg text-error',
  },
  size: {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-0.5 text-sm',
    lg: 'px-3 py-1 text-base',
  },
});

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'md', children, ...props }, ref) => {
    const baseClasses = cn(
      'inline-flex items-center font-medium rounded-full',
      badgeVariants({ variant, size, className })
    );

    return (
      <span ref={ref} className={baseClasses} {...props}>
        {children}
      </span>
    );
  }
);

Badge.displayName = 'Badge'; 