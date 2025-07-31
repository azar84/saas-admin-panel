import React from 'react';
import { cn } from '@saas-admin/design-system';

export interface SidebarItem {
  id: string;
  label: string;
  href?: string;
  icon?: React.ReactNode;
  children?: SidebarItem[];
  badge?: string;
}

export interface SidebarProps {
  items: SidebarItem[];
  activeItem?: string;
  onItemClick?: (item: SidebarItem) => void;
  className?: string;
  collapsed?: boolean;
}

export const Sidebar = React.forwardRef<HTMLDivElement, SidebarProps>(
  ({ items, activeItem, onItemClick, className, collapsed = false }, ref) => {
    const renderItem = (item: SidebarItem, level = 0) => {
      const isActive = activeItem === item.id;
      const hasChildren = item.children && item.children.length > 0;
      
      const itemClasses = cn(
        'flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors',
        'hover:bg-primary hover:text-white',
        {
          'bg-primary text-white': isActive,
          'text-heading': !isActive,
          'pl-6': level > 0,
        }
      );

      const handleClick = () => {
        if (onItemClick) {
          onItemClick(item);
        }
      };

      return (
        <div key={item.id}>
          <div
            className={itemClasses}
            onClick={handleClick}
            role="button"
            tabIndex={0}
          >
            {item.icon && (
              <span className="mr-3 h-5 w-5 flex-shrink-0">
                {item.icon}
              </span>
            )}
            {!collapsed && (
              <>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-white">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </div>
          {hasChildren && !collapsed && (
            <div className="ml-4 mt-1 space-y-1">
              {item.children!.map((child) => renderItem(child, level + 1))}
            </div>
          )}
        </div>
      );
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col bg-bg-secondary border-r border-bg-tertiary min-h-screen',
          collapsed ? 'w-16' : 'w-64',
          className
        )}
      >
        {/* Logo/Brand Section */}
        <div className="flex items-center px-3 py-4 border-b border-bg-tertiary">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-secondary via-warning to-primary flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            {!collapsed && (
              <span className="text-heading font-semibold text-lg">SaaS Admin</span>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 space-y-1 px-3 py-4">
          {items.map((item) => renderItem(item))}
        </div>

        {/* Bottom Section */}
        <div className="border-t border-bg-tertiary px-3 py-4 space-y-4">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between">
                                 {!collapsed && (
                       <span className="text-heading text-sm font-medium">Theme</span>
                     )}
            <div className="flex items-center space-x-2">
              <div className="flex items-center bg-bg-tertiary rounded-lg p-1">
                <button className="px-2 py-1 text-xs font-medium text-heading bg-bg-main rounded">
                  Light
                </button>
                <button className="px-2 py-1 text-xs font-medium text-body hover:text-heading">
                  Dark
                </button>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="flex items-center space-x-3">
            <div className="h-8 w-8 rounded-full bg-bg-tertiary flex items-center justify-center">
              <span className="text-body text-sm font-medium">S</span>
            </div>
            {!collapsed && (
              <div className="flex-1">
                <p className="text-heading text-sm font-medium">Sulzine</p>
                <p className="text-body text-xs">Admin</p>
              </div>
            )}
            {!collapsed && (
              <svg className="h-4 w-4 text-placeholder" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            )}
          </div>
        </div>
      </div>
    );
  }
);

Sidebar.displayName = 'Sidebar'; 