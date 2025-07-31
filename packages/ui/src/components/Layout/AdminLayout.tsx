import React, { useState } from 'react';
import { cn } from '@saas-admin/design-system';
import { Sidebar, SidebarItem } from './Sidebar';
import { Header, HeaderProps } from './Header';

export interface AdminLayoutProps {
  sidebarItems: SidebarItem[];
  activeItem?: string;
  onSidebarItemClick?: (item: SidebarItem) => void;
  header?: HeaderProps;
  children: React.ReactNode;
  className?: string;
  sidebarCollapsed?: boolean;
  onSidebarToggle?: (collapsed: boolean) => void;
}

export const AdminLayout = React.forwardRef<HTMLDivElement, AdminLayoutProps>(
  ({
    sidebarItems,
    activeItem,
    onSidebarItemClick,
    header,
    children,
    className,
    sidebarCollapsed = false,
    onSidebarToggle,
  }, ref) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleSidebarToggle = () => {
      if (onSidebarToggle) {
        onSidebarToggle(!sidebarCollapsed);
      }
    };

    return (
      <div
        ref={ref}
        className={cn('flex h-screen bg-bg-main', className)}
      >
        {/* Mobile menu overlay */}
        {isMobileMenuOpen && (
          <div
                             className="fixed inset-0 z-40 bg-overlay/50 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={cn(
          'fixed inset-y-0 left-0 z-50 lg:static lg:z-auto h-full',
          isMobileMenuOpen ? 'block' : 'hidden lg:block'
        )}>
          <Sidebar
            items={sidebarItems}
            activeItem={activeItem}
            onItemClick={(item) => {
              onSidebarItemClick?.(item);
              setIsMobileMenuOpen(false);
            }}
            collapsed={sidebarCollapsed}
          />
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Top bar */}
                     <div className="flex h-16 items-center justify-between border-b border-bg-tertiary bg-bg-secondary px-4 lg:px-6">
            <div className="flex items-center">
              <button
                type="button"
                className="lg:hidden -m-2.5 inline-flex h-10 w-10 items-center justify-center rounded-md text-body hover:text-heading hover:bg-bg-secondary"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              </button>
              
              {!sidebarCollapsed && (
                <button
                  type="button"
                  className="hidden lg:inline-flex -m-2.5 h-10 w-10 items-center justify-center rounded-md text-body hover:text-heading hover:bg-bg-secondary"
                  onClick={handleSidebarToggle}
                >
                  <span className="sr-only">Toggle sidebar</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18.75 19.5l-7.5-7.5 7.5-7.5m-6 15L5.25 12l7.5-7.5" />
                  </svg>
                </button>
              )}
            </div>

            {/* User menu placeholder */}
            <div className="flex items-center space-x-4">
              <button className="rounded-full bg-bg-secondary p-1 text-body hover:text-heading">
                <span className="sr-only">View notifications</span>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                </svg>
              </button>
              
              <div className="h-8 w-8 rounded-full bg-bg-tertiary flex items-center justify-center">
                <span className="text-sm font-medium text-body">U</span>
              </div>
            </div>
          </div>

          {/* Page header */}
          {header && <Header {...header} />}

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto">
            <div className="px-4 py-6 lg:px-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    );
  }
);

AdminLayout.displayName = 'AdminLayout'; 