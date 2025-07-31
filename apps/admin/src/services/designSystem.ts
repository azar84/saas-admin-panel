// Design System Management Service
export interface DesignToken {
  name: string;
  value: string;
  description?: string;
}

export interface ColorPalette {
  name: string;
  colors: DesignToken[];
}

export interface TypographyTokens {
  fontSizes: Record<string, string>;
  fontWeights: Record<string, string>;
  lineHeights: Record<string, string>;
}

export interface SpacingTokens {
  [key: string]: string;
}

export interface BorderRadiusTokens {
  [key: string]: string;
}

export interface DesignSystemConfig {
  colors: Record<string, ColorPalette>;
  typography: TypographyTokens;
  spacing: SpacingTokens;
  borderRadius: BorderRadiusTokens;
}

class DesignSystemService {
  private config: DesignSystemConfig;
  private listeners: ((config: DesignSystemConfig) => void)[] = [];

  constructor() {
    // Initialize with default design system
    this.config = {
      colors: {
        primary: {
          name: 'primary',
          colors: [
            { name: '50', value: '#f0f4ff', description: 'Lightest primary color' },
            { name: '100', value: '#e0e7ff', description: 'Very light primary color' },
            { name: '200', value: '#c7d2fe', description: 'Light primary color' },
            { name: '300', value: '#a5b4fc', description: 'Medium light primary color' },
            { name: '400', value: '#818cf8', description: 'Medium primary color' },
            { name: '500', value: '#6366f1', description: 'Base primary color' },
            { name: '600', value: '#4f46e5', description: 'Medium dark primary color' },
            { name: '700', value: '#4338ca', description: 'Dark primary color' },
            { name: '800', value: '#3730a3', description: 'Very dark primary color' },
            { name: '900', value: '#312e81', description: 'Darkest primary color' },
          ],
        },
        secondary: {
          name: 'secondary',
          colors: [
            { name: '50', value: '#faf5ff', description: 'Lightest secondary color' },
            { name: '100', value: '#f3e8ff', description: 'Very light secondary color' },
            { name: '200', value: '#e9d5ff', description: 'Light secondary color' },
            { name: '300', value: '#d8b4fe', description: 'Medium light secondary color' },
            { name: '400', value: '#c084fc', description: 'Medium secondary color' },
            { name: '500', value: '#a855f7', description: 'Base secondary color' },
            { name: '600', value: '#9333ea', description: 'Medium dark secondary color' },
            { name: '700', value: '#7c3aed', description: 'Dark secondary color' },
            { name: '800', value: '#6b21a8', description: 'Very dark secondary color' },
            { name: '900', value: '#581c87', description: 'Darkest secondary color' },
          ],
        },
        neutral: {
          name: 'neutral',
          colors: [
            { name: '50', value: '#f8fafc', description: 'Lightest neutral color' },
            { name: '100', value: '#f1f5f9', description: 'Very light neutral color' },
            { name: '200', value: '#e2e8f0', description: 'Light neutral color' },
            { name: '300', value: '#cbd5e1', description: 'Medium light neutral color' },
            { name: '400', value: '#94a3b8', description: 'Medium neutral color' },
            { name: '500', value: '#64748b', description: 'Base neutral color' },
            { name: '600', value: '#475569', description: 'Medium dark neutral color' },
            { name: '700', value: '#334155', description: 'Dark neutral color' },
            { name: '800', value: '#1e293b', description: 'Very dark neutral color' },
            { name: '900', value: '#0f172a', description: 'Darkest neutral color' },
          ],
        },
      },
      typography: {
        fontSizes: {
          xs: '0.75rem',
          sm: '0.875rem',
          base: '1rem',
          lg: '1.125rem',
          xl: '1.25rem',
          '2xl': '1.5rem',
          '3xl': '1.875rem',
        },
        fontWeights: {
          normal: '400',
          medium: '500',
          semibold: '600',
          bold: '700',
        },
        lineHeights: {
          none: '1',
          tight: '1.25',
          normal: '1.5',
          relaxed: '1.625',
        },
      },
      spacing: {
        0: '0px',
        1: '0.25rem',
        2: '0.5rem',
        3: '0.75rem',
        4: '1rem',
        5: '1.25rem',
        6: '1.5rem',
        8: '2rem',
        10: '2.5rem',
        12: '3rem',
        16: '4rem',
        20: '5rem',
        24: '6rem',
      },
      borderRadius: {
        none: '0px',
        sm: '0.125rem',
        base: '0.25rem',
        md: '0.375rem',
        lg: '0.5rem',
        xl: '0.75rem',
        '2xl': '1rem',
        full: '9999px',
      },
    };
  }

  // Get current configuration
  getConfig(): DesignSystemConfig {
    return this.config;
  }

  // Update color token
  updateColor(paletteName: string, colorName: string, value: string): void {
    if (this.config.colors[paletteName]) {
      const color = this.config.colors[paletteName].colors.find(c => c.name === colorName);
      if (color) {
        color.value = value;
        this.notifyListeners();
      }
    }
  }

  // Update typography token
  updateTypography(category: keyof TypographyTokens, token: string, value: string): void {
    if (this.config.typography[category]) {
      this.config.typography[category][token] = value;
      this.notifyListeners();
    }
  }

  // Update spacing token
  updateSpacing(token: string, value: string): void {
    this.config.spacing[token] = value;
    this.notifyListeners();
  }

  // Update border radius token
  updateBorderRadius(token: string, value: string): void {
    this.config.borderRadius[token] = value;
    this.notifyListeners();
  }

  // Subscribe to changes
  subscribe(listener: (config: DesignSystemConfig) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.config));
  }

  // Export configuration
  exportConfig(): string {
    return JSON.stringify(this.config, null, 2);
  }

  // Import configuration
  importConfig(configString: string): void {
    try {
      const newConfig = JSON.parse(configString);
      this.config = newConfig;
      this.notifyListeners();
    } catch (error) {
      console.error('Failed to import design system config:', error);
    }
  }

  // Generate CSS custom properties
  generateCSSVariables(): string {
    let css = ':root {\n';
    
    // Color variables
    Object.entries(this.config.colors).forEach(([paletteName, palette]) => {
      palette.colors.forEach(color => {
        css += `  --color-${paletteName}-${color.name}: ${color.value};\n`;
      });
    });

    // Typography variables
    Object.entries(this.config.typography.fontSizes).forEach(([name, value]) => {
      css += `  --font-size-${name}: ${value};\n`;
    });

    Object.entries(this.config.typography.fontWeights).forEach(([name, value]) => {
      css += `  --font-weight-${name}: ${value};\n`;
    });

    // Spacing variables
    Object.entries(this.config.spacing).forEach(([name, value]) => {
      css += `  --spacing-${name}: ${value};\n`;
    });

    // Border radius variables
    Object.entries(this.config.borderRadius).forEach(([name, value]) => {
      css += `  --border-radius-${name}: ${value};\n`;
    });

    css += '}';
    return css;
  }
}

// Export singleton instance
export const designSystemService = new DesignSystemService(); 