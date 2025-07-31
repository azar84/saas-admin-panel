'use client';

import { useEffect } from 'react';
import { designSystemService } from '@/services/designSystemService';

export function DynamicCSS() {
  useEffect(() => {
    // Load the design system config immediately
    designSystemService.loadActiveConfig();
    
    const updateCSSVariables = () => {
      const config = designSystemService.getConfig();
      const root = document.documentElement;
      
      // Set default values if no config is available
      if (!config) {
        // Set default comprehensive color palette
        const defaultColors = {
          // Brand Colors
          primary: '#4334B6',
          secondary: '#F6393D',
          tertiary: '#7D6BFF',
          
          // Neutral Colors
          white: '#FFFFFF',
          light: '#F7F7F8',
          medium: '#D1D5DB',
          dark: '#1F2937',
          darkest: '#111827',
          muted: '#6B7280',
          
          // System Colors
          success: '#10B981',
          'success-bg': '#D1FAE5',
          warning: '#F59E0B',
          'warning-bg': '#FEF3C7',
          error: '#EF4444',
          'error-bg': '#FEE2E2',
          info: '#3B82F6',
          'info-bg': '#DBEAFE',
          
          // Typography Colors
          heading: '#111827',
          body: '#374151',
          placeholder: '#9CA3AF',
          disabled: '#D1D5DB',
          
          // Background Layers
          'bg-main': '#FFFFFF',
          'bg-secondary': '#F9FAFB',
          'bg-tertiary': '#F3F4F6',
          overlay: 'rgba(0, 0, 0, 0.5)',
          
          // Button States
          'btn-primary': '#4334B6',
          'btn-primary-hover': '#3729A3',
          'btn-secondary': '#F6393D',
          'btn-disabled': '#D1D5DB',
          'btn-text': '#FFFFFF',
          
          // Utility/Accent Colors
          'accent-1': '#8B5CF6',
          'accent-2': '#06B6D4',
          'accent-3': '#F59E0B',
        };

        // Apply default colors
        Object.entries(defaultColors).forEach(([colorName, colorValue]) => {
          root.style.setProperty(`--${colorName}`, colorValue);
        });

        // Set default font families - use CSS variables only
        root.style.setProperty('--font-family-sans', 'Inter, system-ui, sans-serif');
        root.style.setProperty('--font-family-mono', 'JetBrains Mono, monospace');
        
        // Set default typography
        const defaultTypography = {
          fontSize: {
            xs: '0.75rem',
            sm: '0.875rem',
            base: '1rem',
            lg: '1.125rem',
            xl: '1.25rem',
            '2xl': '1.5rem',
            '3xl': '1.875rem',
            '4xl': '2.25rem',
          },
          fontWeight: {
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
          },
          lineHeight: {
            none: '1',
            tight: '1.25',
            normal: '1.5',
            relaxed: '1.625',
          },
        };

        // Apply default typography
        Object.entries(defaultTypography.fontSize).forEach(([size, value]) => {
          root.style.setProperty(`--font-size-${size}`, value);
        });
        Object.entries(defaultTypography.fontWeight).forEach(([weight, value]) => {
          root.style.setProperty(`--font-weight-${weight}`, value);
        });
        Object.entries(defaultTypography.lineHeight).forEach(([height, value]) => {
          root.style.setProperty(`--line-height-${height}`, value);
        });

        // Set default spacing
        const defaultSpacing = {
          '0': '0px',
          '1': '0.25rem',
          '2': '0.5rem',
          '3': '0.75rem',
          '4': '1rem',
          '5': '1.25rem',
          '6': '1.5rem',
          '8': '2rem',
          '10': '2.5rem',
          '12': '3rem',
          '16': '4rem',
          '20': '5rem',
          '24': '6rem',
        };

        Object.entries(defaultSpacing).forEach(([space, value]) => {
          root.style.setProperty(`--spacing-${space}`, value);
        });

        // Set default border radius
        const defaultBorderRadius = {
          none: '0px',
          sm: '0.125rem',
          base: '0.25rem',
          md: '0.375rem',
          lg: '0.5rem',
          xl: '0.75rem',
          '2xl': '1rem',
          full: '9999px',
        };

        Object.entries(defaultBorderRadius).forEach(([radius, value]) => {
          root.style.setProperty(`--border-radius-${radius}`, value);
        });

        // Set default shadows
        const defaultShadows = {
          sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
          base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
          md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
          xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
        };

        Object.entries(defaultShadows).forEach(([shadow, value]) => {
          root.style.setProperty(`--shadow-${shadow}`, value);
        });
      } else {
        // Apply the loaded config
        designSystemService.applyConfigToDOM(config);
      }
    };

    updateCSSVariables();

    // Subscribe to config changes
    const unsubscribe = designSystemService.subscribe(() => {
      updateCSSVariables();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null;
} 