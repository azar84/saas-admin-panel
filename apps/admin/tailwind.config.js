/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/design-system/src/**/*.{js,ts,jsx,tsx}',
    '../../packages/ui/src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'var(--primary-50)',
          100: 'var(--primary-100)',
          200: 'var(--primary-200)',
          300: 'var(--primary-300)',
          400: 'var(--primary-400)',
          500: 'var(--primary-500)',
          600: 'var(--primary-600)',
          700: 'var(--primary-700)',
          800: 'var(--primary-800)',
          900: 'var(--primary-900)',
        },
        secondary: {
          50: 'var(--secondary-50)',
          100: 'var(--secondary-100)',
          200: 'var(--secondary-200)',
          300: 'var(--secondary-300)',
          400: 'var(--secondary-400)',
          500: 'var(--secondary-500)',
          600: 'var(--secondary-600)',
          700: 'var(--secondary-700)',
          800: 'var(--secondary-800)',
          900: 'var(--secondary-900)',
        },
        neutral: {
          50: 'var(--neutral-50)',
          100: 'var(--neutral-100)',
          200: 'var(--neutral-200)',
          300: 'var(--neutral-300)',
          400: 'var(--neutral-400)',
          500: 'var(--neutral-500)',
          600: 'var(--neutral-600)',
          700: 'var(--neutral-700)',
          800: 'var(--neutral-800)',
          900: 'var(--neutral-900)',
        },
        success: {
          50: 'var(--success-50)',
          100: 'var(--success-100)',
          200: 'var(--success-200)',
          300: 'var(--success-300)',
          400: 'var(--success-400)',
          500: 'var(--success-500)',
          600: 'var(--success-600)',
          700: 'var(--success-700)',
          800: 'var(--success-800)',
          900: 'var(--success-900)',
        },
        warning: {
          50: 'var(--warning-50)',
          100: 'var(--warning-100)',
          200: 'var(--warning-200)',
          300: 'var(--warning-300)',
          400: 'var(--warning-400)',
          500: 'var(--warning-500)',
          600: 'var(--warning-600)',
          700: 'var(--warning-700)',
          800: 'var(--warning-800)',
          900: 'var(--warning-900)',
        },
        error: {
          50: 'var(--error-50)',
          100: 'var(--error-100)',
          200: 'var(--error-200)',
          300: 'var(--error-300)',
          400: 'var(--error-400)',
          500: 'var(--error-500)',
          600: 'var(--error-600)',
          700: 'var(--error-700)',
          800: 'var(--error-800)',
          900: 'var(--error-900)',
        },
              },
        // Comprehensive color system
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
          
          // Button States
          'btn-primary': 'var(--btn-primary)',
          'btn-primary-hover': 'var(--btn-primary-hover)',
          'btn-secondary': 'var(--btn-secondary)',
          'btn-disabled': 'var(--btn-disabled)',
          'btn-text': 'var(--btn-text)',
          
          // Utility/Accent Colors
          'accent-1': 'var(--accent-1)',
          'accent-2': 'var(--accent-2)',
          'accent-3': 'var(--accent-3)',
        },
      },
    },
    plugins: [],
  }; 