import sqlite3 from 'sqlite3';
import { v4 as uuidv4 } from 'uuid';

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

class DatabaseService {
  private db: sqlite3.Database;

  constructor() {
    this.db = new sqlite3.Database('./design-system.db');
    this.initDatabase();
  }

  private initDatabase() {
    this.db.serialize(() => {
      // Create design system configs table
      this.db.run(`
        CREATE TABLE IF NOT EXISTS design_system_configs (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          colors TEXT NOT NULL,
          typography TEXT NOT NULL,
          spacing TEXT NOT NULL,
          borderRadius TEXT NOT NULL,
          shadows TEXT NOT NULL,
          createdAt TEXT NOT NULL,
          updatedAt TEXT NOT NULL
        )
      `);

      // Create default config if none exists
      this.db.get('SELECT COUNT(*) as count FROM design_system_configs', (err, row) => {
        if (err) {
          console.error('Error checking configs:', err);
          return;
        }
        
        if (row.count === 0) {
          this.createDefaultConfig();
        }
      });
    });
  }

  private createDefaultConfig() {
    const defaultConfig: Omit<DesignSystemConfig, 'id' | 'createdAt' | 'updatedAt'> = {
      name: 'Default Design System',
              colors: {
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
        },
      typography: {
        fontFamily: {
          sans: ['Inter', 'system-ui', 'sans-serif'],
          mono: ['JetBrains Mono', 'monospace'],
        },
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
      },
      spacing: {
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
      shadows: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
    };

    this.saveConfig(defaultConfig);
  }

  async getAllConfigs(): Promise<DesignSystemConfig[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM design_system_configs ORDER BY createdAt DESC', (err, rows) => {
        if (err) {
          reject(err);
          return;
        }
        
        const configs = rows.map(row => ({
          ...row,
          colors: JSON.parse(row.colors),
          typography: JSON.parse(row.typography),
          spacing: JSON.parse(row.spacing),
          borderRadius: JSON.parse(row.borderRadius),
          shadows: JSON.parse(row.shadows),
        }));
        
        resolve(configs);
      });
    });
  }

  async getConfigById(id: string): Promise<DesignSystemConfig | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM design_system_configs WHERE id = ?', [id], (err, row) => {
        if (err) {
          reject(err);
          return;
        }
        
        if (!row) {
          resolve(null);
          return;
        }
        
        const config = {
          ...row,
          colors: JSON.parse(row.colors),
          typography: JSON.parse(row.typography),
          spacing: JSON.parse(row.spacing),
          borderRadius: JSON.parse(row.borderRadius),
          shadows: JSON.parse(row.shadows),
        };
        
        resolve(config);
      });
    });
  }

  async saveConfig(config: Omit<DesignSystemConfig, 'id' | 'createdAt' | 'updatedAt'>): Promise<DesignSystemConfig> {
    const id = uuidv4();
    const now = new Date().toISOString();
    
    return new Promise((resolve, reject) => {
      this.db.run(
        `INSERT INTO design_system_configs (id, name, colors, typography, spacing, borderRadius, shadows, createdAt, updatedAt)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          config.name,
          JSON.stringify(config.colors),
          JSON.stringify(config.typography),
          JSON.stringify(config.spacing),
          JSON.stringify(config.borderRadius),
          JSON.stringify(config.shadows),
          now,
          now,
        ],
        function(err) {
          if (err) {
            reject(err);
            return;
          }
          
          resolve({
            id,
            ...config,
            createdAt: now,
            updatedAt: now,
          });
        }
      );
    });
  }

  async updateConfig(id: string, config: Partial<Omit<DesignSystemConfig, 'id' | 'createdAt'>>): Promise<DesignSystemConfig | null> {
    const now = new Date().toISOString();
    
    return new Promise((resolve, reject) => {
      const updates: string[] = [];
      const values: any[] = [];
      
      if (config.name) {
        updates.push('name = ?');
        values.push(config.name);
      }
      if (config.colors) {
        updates.push('colors = ?');
        values.push(JSON.stringify(config.colors));
      }
      if (config.typography) {
        updates.push('typography = ?');
        values.push(JSON.stringify(config.typography));
      }
      if (config.spacing) {
        updates.push('spacing = ?');
        values.push(JSON.stringify(config.spacing));
      }
      if (config.borderRadius) {
        updates.push('borderRadius = ?');
        values.push(JSON.stringify(config.borderRadius));
      }
      if (config.shadows) {
        updates.push('shadows = ?');
        values.push(JSON.stringify(config.shadows));
      }
      
      updates.push('updatedAt = ?');
      values.push(now);
      values.push(id);
      
      this.db.run(
        `UPDATE design_system_configs SET ${updates.join(', ')} WHERE id = ?`,
        values,
        function(err) {
          if (err) {
            reject(err);
            return;
          }
          
          if (this.changes === 0) {
            resolve(null);
            return;
          }
          
          // Return the updated config
          this.getConfigById(id).then(resolve).catch(reject);
        }.bind(this)
      );
    });
  }

  async deleteConfig(id: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM design_system_configs WHERE id = ?', [id], function(err) {
        if (err) {
          reject(err);
          return;
        }
        
        resolve(this.changes > 0);
      });
    });
  }

  close() {
    this.db.close();
  }
}

export const db = new DatabaseService(); 