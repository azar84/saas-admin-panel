import React from 'react';
import { cn } from '@saas-admin/design-system';

/**
 * Example component demonstrating how to use the design system
 * This shows how to apply design tokens consistently
 */
export interface ExampleComponentProps {
  title: string;
  description?: string;
  variant?: 'default' | 'highlighted';
  className?: string;
}

export const ExampleComponent = React.forwardRef<HTMLDivElement, ExampleComponentProps>(
  ({ title, description, variant = 'default', className }, ref) => {
    const baseClasses = cn(
      // Using design system spacing
      'p-6 rounded-lg border',
      
      // Using design system colors based on variant
      {
        'bg-bg-main border-medium text-heading': variant === 'default',
        'bg-accent-1 border-primary text-primary': variant === 'highlighted',
      },
      
      // Using design system shadows
      'shadow-sm',
      
      // Custom className for additional styling
      className
    );

    return (
      <div ref={ref} className={baseClasses}>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        {description && (
          <p className="text-sm text-body">{description}</p>
        )}
      </div>
    );
  }
);

ExampleComponent.displayName = 'ExampleComponent'; 