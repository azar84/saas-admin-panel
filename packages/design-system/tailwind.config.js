const { colors, spacing, typography, breakpoints, borderRadius, shadows } = require('./src/tokens');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
    '../../apps/**/*.{js,ts,jsx,tsx}',
    '../../packages/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors,
      spacing,
      fontSize: typography.fontSize,
      fontWeight: typography.fontWeight,
      lineHeight: typography.lineHeight,
      letterSpacing: typography.letterSpacing,
      fontFamily: typography.fontFamily,
      borderRadius,
      boxShadow: shadows,
      screens: breakpoints,
    },
  },
  plugins: [],
}; 