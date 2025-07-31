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
          muted: '#9CA3AF',
          
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
          overlay: 'rgba(0,0,0,0.5)',
          

          
          // Utility/Accent Colors
          'accent-1': '#E0F2FE',
          'accent-2': '#FFF7ED',
          'accent-3': '#ECFDF5',
        };

        Object.entries(defaultColors).forEach(([colorName, colorValue]) => {
          root.style.setProperty(`--${colorName}`, colorValue);
        });

        // Set default font families
        root.style.setProperty('--font-family-sans', 'Inter, system-ui, sans-serif');
        root.style.setProperty('--font-family-mono', 'JetBrains Mono, monospace');
        
        return;
      }
      
      // Apply comprehensive color palette
      Object.entries(config.colors).forEach(([colorName, colorValue]) => {
        root.style.setProperty(`--${colorName}`, colorValue);
      });

      // Apply typography
      if (config.typography.fontFamily) {
        Object.entries(config.typography.fontFamily).forEach(([family, fonts]) => {
          const fontStack = Array.isArray(fonts) ? fonts.join(', ') : fonts;
          root.style.setProperty(`--font-family-${family}`, fontStack);
        });
      }

      if (config.typography.fontSize) {
        Object.entries(config.typography.fontSize).forEach(([size, value]) => {
          root.style.setProperty(`--font-size-${size}`, value);
        });
      }

      if (config.typography.fontWeight) {
        Object.entries(config.typography.fontWeight).forEach(([weight, value]) => {
          root.style.setProperty(`--font-weight-${weight}`, value);
        });
      }

      if (config.typography.lineHeight) {
        Object.entries(config.typography.lineHeight).forEach(([height, value]) => {
          root.style.setProperty(`--line-height-${height}`, value);
        });
      }

      // Apply spacing
      Object.entries(config.spacing).forEach(([space, value]) => {
        root.style.setProperty(`--spacing-${space}`, value);
      });

      // Apply border radius
      Object.entries(config.borderRadius).forEach(([radius, value]) => {
        root.style.setProperty(`--border-radius-${radius}`, value);
      });

      // Apply shadows
      Object.entries(config.shadows).forEach(([shadow, value]) => {
        root.style.setProperty(`--shadow-${shadow}`, value);
      });
    };

    // Initial update
    updateCSSVariables();

    // Subscribe to changes
    const unsubscribe = designSystemService.subscribe(() => {
      updateCSSVariables();
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return null; // This component doesn't render anything
} 