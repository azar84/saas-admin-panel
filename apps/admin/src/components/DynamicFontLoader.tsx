'use client';

import { useEffect, useState } from 'react';
import { designSystemService } from '@/services/designSystemService';

// Google Fonts that we support
const GOOGLE_FONTS = ['Inter', 'Roboto', 'Open Sans', 'Lato', 'Poppins', 'Montserrat', 'Nunito'];

// Monospace fonts that we support
const MONOSPACE_FONTS = ['JetBrains Mono', 'Fira Code', 'Source Code Pro'];

// Font configurations with specific weights
const FONT_CONFIGS = {
  'Inter': { weights: ['300', '400', '500', '600', '700'] },
  'Roboto': { weights: ['300', '400', '500', '700'] },
  'Open Sans': { weights: ['300', '400', '500', '600', '700'] },
  'Lato': { weights: ['300', '400', '700'] },
  'Poppins': { weights: ['300', '400', '500', '600', '700'] },
  'Montserrat': { weights: ['300', '400', '500', '600', '700'] },
  'Nunito': { weights: ['300', '400', '500', '600', '700'] },
  // Monospace fonts
  'JetBrains Mono': { weights: ['300', '400', '500', '600', '700'] },
  'Fira Code': { weights: ['300', '400', '500', '600', '700'] },
  'Source Code Pro': { weights: ['300', '400', '500', '600', '700'] },
};

// Map CSS variables to actual font names
const CSS_VAR_TO_FONT = {
  'var(--font-inter)': 'Inter',
  'var(--font-roboto)': 'Roboto',
  'var(--font-open-sans)': 'Open Sans',
  'var(--font-lato)': 'Lato',
  'var(--font-poppins)': 'Poppins',
  'var(--font-montserrat)': 'Montserrat',
  'var(--font-nunito)': 'Nunito',
  // Monospace fonts
  'var(--font-jetbrains-mono)': 'JetBrains Mono',
  'var(--font-fira-code)': 'Fira Code',
  'var(--font-source-code-pro)': 'Source Code Pro',
};

export function DynamicFontLoader() {
  const [loadedFont, setLoadedFont] = useState<string | null>(null);

  useEffect(() => {
    const loadGoogleFont = (fontName: string) => {
      if (!GOOGLE_FONTS.includes(fontName) && !MONOSPACE_FONTS.includes(fontName)) {
        return;
      }
      
      if (loadedFont === fontName) {
        return; // Already loaded
      }

      // Remove previous font link if exists
      const existingLink = document.getElementById('google-font-link');
      if (existingLink) {
        existingLink.remove();
      }

      // Get font configuration
      const fontConfig = FONT_CONFIGS[fontName as keyof typeof FONT_CONFIGS];
      if (!fontConfig) {
        return;
      }

      // Create new font link using Google Fonts CSS API
      const link = document.createElement('link');
      link.id = 'google-font-link';
      link.rel = 'stylesheet';
      link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(' ', '+')}:wght@${fontConfig.weights.join(';')}&display=swap`;
      
      document.head.appendChild(link);
      setLoadedFont(fontName);
    };

    const updateFont = () => {
      const config = designSystemService.getConfig();
      
      // Check sans fonts
      if (config?.typography?.fontFamily?.sans) {
        const selectedFont = config.typography.fontFamily.sans[0];
        
        // Check if it's a CSS variable and convert to actual font name
        let actualFontName = selectedFont;
        if (CSS_VAR_TO_FONT[selectedFont as keyof typeof CSS_VAR_TO_FONT]) {
          actualFontName = CSS_VAR_TO_FONT[selectedFont as keyof typeof CSS_VAR_TO_FONT];
        }
        
        if (actualFontName && GOOGLE_FONTS.includes(actualFontName)) {
          loadGoogleFont(actualFontName);
        }
      }
      
      // Check mono fonts - only load if it's different from the current loaded font
      if (config?.typography?.fontFamily?.mono) {
        const selectedMonoFont = config.typography.fontFamily.mono[0];
        
        // Check if it's a CSS variable and convert to actual font name
        let actualMonoFontName = selectedMonoFont;
        if (CSS_VAR_TO_FONT[selectedMonoFont as keyof typeof CSS_VAR_TO_FONT]) {
          actualMonoFontName = CSS_VAR_TO_FONT[selectedMonoFont as keyof typeof CSS_VAR_TO_FONT];
        }
        
        if (actualMonoFontName && MONOSPACE_FONTS.includes(actualMonoFontName)) {
          // Only load if it's different from the currently loaded font
          if (loadedFont !== actualMonoFontName) {
            loadGoogleFont(actualMonoFontName);
          }
        }
      }
    };

    // Initial load
    updateFont();

    // Subscribe to changes
    const unsubscribe = designSystemService.subscribe(updateFont);
    
    return () => unsubscribe();
  }, [loadedFont]);

  return null;
} 