/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/design-system/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-family-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-family-mono)', 'monospace'],
      },
      colors: {
        // Brand Colors
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        tertiary: 'var(--tertiary)',
        
        // Neutral Colors
        white: 'var(--white)',
        light: 'var(--light)',
        medium: 'var(--medium)',
        dark: 'var(--dark)',
        darkest: 'var(--darkest)',
        muted: 'var(--muted)',
        
        // System Colors
        success: 'var(--success)',
        'success-bg': 'var(--success-bg)',
        warning: 'var(--warning)',
        'warning-bg': 'var(--warning-bg)',
        error: 'var(--error)',
        'error-bg': 'var(--error-bg)',
        info: 'var(--info)',
        'info-bg': 'var(--info-bg)',
        
        // Typography Colors
        heading: 'var(--heading)',
        body: 'var(--body)',
        placeholder: 'var(--placeholder)',
        disabled: 'var(--disabled)',
        
        // Background Layers
        'bg-main': 'var(--bg-main)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        overlay: 'var(--overlay)',
        
        // Utility/Accent Colors
        'accent-1': 'var(--accent-1)',
        'accent-2': 'var(--accent-2)',
        'accent-3': 'var(--accent-3)',
      },
    },
  },
  plugins: [],
}; 