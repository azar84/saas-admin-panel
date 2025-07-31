export interface DesignSystemConfig {
  id: string;
  name: string;
  colors: {
    // Brand Colors
    primary: string;
    secondary: string;
    tertiary: string;
    
    // Neutral Colors
    white: string;
    light: string;
    medium: string;
    dark: string;
    darkest: string;
    muted: string;
    
    // System Colors
    success: string;
    'success-bg': string;
    warning: string;
    'warning-bg': string;
    error: string;
    'error-bg': string;
    info: string;
    'info-bg': string;
    
    // Typography Colors
    heading: string;
    body: string;
    placeholder: string;
    disabled: string;
    
    // Background Layers
    'bg-main': string;
    'bg-secondary': string;
    'bg-tertiary': string;
    overlay: string;
    
    // Button States
    'btn-primary': string;
    'btn-primary-hover': string;
    'btn-secondary': string;
    'btn-disabled': string;
    'btn-text': string;
    
    // Utility/Accent Colors
    'accent-1': string;
    'accent-2': string;
    'accent-3': string;
  };
  typography: Record<string, any>;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  shadows: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}

class DesignSystemService {
  private config: DesignSystemConfig | null = null;
  private subscribers: ((config: DesignSystemConfig) => void)[] = [];
  private overrides: Record<string, string> = {};

  async loadActiveConfig(): Promise<DesignSystemConfig | null> {
    try {
      console.log('Loading design system config...');
      const response = await fetch('/api/design-system/active/default');
      console.log('Response status:', response.status);
      if (response.ok) {
        this.config = await response.json();
        console.log('Config loaded:', this.config);
        this.applyConfig(this.config);
        this.notifySubscribers();
        return this.config;
      } else {
        console.error('API response not ok:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error loading design system config:', error);
    }
    return null;
  }

  async saveConfig(config: Omit<DesignSystemConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<DesignSystemConfig | null> {
    try {
      const response = await fetch('/api/design-system', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });
      
      if (response.ok) {
        const savedConfig = await response.json();
        this.config = savedConfig.config;
        this.applyConfig(this.config);
        this.notifySubscribers();
        return this.config;
      }
    } catch (error) {
      console.error('Error saving design system config:', error);
    }
    return null;
  }

  async updateConfig(id: string, updates: Partial<DesignSystemConfig>): Promise<DesignSystemConfig | null> {
    try {
      const response = await fetch(`/api/design-system/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      
      if (response.ok) {
        const result = await response.json();
        this.config = result.config;
        this.applyConfig(this.config);
        this.notifySubscribers();
        return this.config;
      } else {
        const errorText = await response.text();
        console.error('API error:', errorText);
      }
    } catch (error) {
      console.error('Error updating design system config:', error);
    }
    return null;
  }

  getConfig(): DesignSystemConfig | null {
    return this.config;
  }

  subscribe(callback: (config: DesignSystemConfig) => void): () => void {
    this.subscribers.push(callback);
    return () => {
      const index = this.subscribers.indexOf(callback);
      if (index > -1) {
        this.subscribers.splice(index, 1);
      }
    };
  }

  private notifySubscribers() {
    if (this.config) {
      this.subscribers.forEach(callback => callback(this.config!));
    }
  }

  private applyConfig(config: DesignSystemConfig) {
    if (!config) return;

    const root = document.documentElement;
    
    // Apply comprehensive color palette
    Object.entries(config.colors).forEach(([colorName, colorValue]) => {
      root.style.setProperty(`--${colorName}`, colorValue);
    });

    // Apply overrides if any
    if (this.overrides) {
      Object.entries(this.overrides).forEach(([token, value]) => {
        root.style.setProperty(`--${token}`, value);
      });
    }

    // Apply typography - use CSS variables only
    if (config.typography.fontFamily) {
      Object.entries(config.typography.fontFamily).forEach(([family, fonts]) => {
        const fontStack = Array.isArray(fonts) ? fonts.join(', ') : fonts;
        
        if (family === 'sans') {
          root.style.setProperty('--font-family-sans', fontStack);
        } else if (family === 'mono') {
          root.style.setProperty('--font-family-mono', fontStack);
        }
      });
    }

    // Apply font sizes
    if (config.typography.fontSize) {
      Object.entries(config.typography.fontSize).forEach(([size, value]) => {
        root.style.setProperty(`--font-size-${size}`, value);
      });
    }

    // Apply font weights
    if (config.typography.fontWeight) {
      Object.entries(config.typography.fontWeight).forEach(([weight, value]) => {
        root.style.setProperty(`--font-weight-${weight}`, value);
      });
    }

    // Apply line heights
    if (config.typography.lineHeight) {
      Object.entries(config.typography.lineHeight).forEach(([height, value]) => {
        root.style.setProperty(`--line-height-${height}`, value);
      });
    }

    // Apply letter spacing
    if (config.typography.letterSpacing) {
      Object.entries(config.typography.letterSpacing).forEach(([spacing, value]) => {
        root.style.setProperty(`--letter-spacing-${spacing}`, value);
      });
    }

    // Apply spacing
    if (config.spacing) {
      Object.entries(config.spacing).forEach(([token, value]) => {
        root.style.setProperty(`--spacing-${token}`, value);
      });
    }

    // Apply border radius
    if (config.borderRadius) {
      Object.entries(config.borderRadius).forEach(([token, value]) => {
        root.style.setProperty(`--border-radius-${token}`, value);
      });
    }

    // Apply shadows
    if (config.shadows) {
      Object.entries(config.shadows).forEach(([token, value]) => {
        root.style.setProperty(`--shadow-${token}`, value);
      });
    }
  }

  // Utility methods for updating specific tokens
  updateColor(paletteName: string, shade: string, value: string) {
    if (this.config) {
      if (!this.config.colors[paletteName]) {
        this.config.colors[paletteName] = {};
      }
      this.config.colors[paletteName][shade] = value;
      this.applyConfig(this.config);
      this.notifySubscribers();
    }
  }

  updateTypography(category: 'fontSize' | 'fontWeight' | 'lineHeight' | 'fontFamily' | 'letterSpacing', token: string, value: string | string[]) {
    if (this.config) {
      if (!this.config.typography[category]) {
        this.config.typography[category] = {};
      }
      this.config.typography[category][token] = value;
      this.applyConfig(this.config);
      this.notifySubscribers();
    }
  }

  updateSpacing(token: string, value: string) {
    if (this.config) {
      this.config.spacing[token] = value;
      this.applyConfig(this.config);
      this.notifySubscribers();
    }
  }

  updateBorderRadius(token: string, value: string) {
    if (this.config) {
      this.config.borderRadius[token] = value;
      this.applyConfig(this.config);
      this.notifySubscribers();
    }
  }

  updateShadow(token: string, value: string) {
    if (this.config) {
      this.config.shadows[token] = value;
      this.applyConfig(this.config);
      this.notifySubscribers();
    }
  }

  exportConfig(): string {
    return JSON.stringify(this.config, null, 2);
  }

  // Override management methods
  setOverride(token: string, value: string) {
    this.overrides[token] = value;
    this.applyConfig(this.config);
  }

  removeOverride(token: string) {
    delete this.overrides[token];
    this.applyConfig(this.config);
  }

  getOverrides(): Record<string, string> {
    return { ...this.overrides };
  }

  public applyConfigToDOM(config: DesignSystemConfig) {
    this.applyConfig(config);
  }
}

export const designSystemService = new DesignSystemService(); 