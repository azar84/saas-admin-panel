import React from 'react';
import { cn } from '@saas-admin/design-system';

export interface HeaderProps {
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  className?: string;
}

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ title, subtitle, actions, breadcrumbs, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'bg-bg-secondary border-b border-bg-tertiary px-6 py-4',
          className
        )}
      >
        {breadcrumbs && (
          <div className="mb-2">
            {breadcrumbs}
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {title && (
              <h1 className="text-2xl font-bold text-heading">
                {title}
              </h1>
            )}
            {subtitle && (
              <p className="mt-1 text-sm text-body">
                {subtitle}
              </p>
            )}
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-placeholder" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search anything here..."
                className="block w-64 pl-10 pr-3 py-2 border border-medium rounded-lg text-sm placeholder-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-bg-secondary"
              />
            </div>
            
            {actions && (
              <div className="flex items-center space-x-3">
                {actions}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Header.displayName = 'Header'; 